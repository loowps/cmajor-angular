import { ChangeDetectionStrategy, Component, OnDestroy, input, signal } from '@angular/core';

interface ChannelState {
  display: number;
  peak: number;
  peakSetAt: number;
  clipped: boolean;
}

function unlitWidth(display: number): string {
  return `calc(${(1 - display) * 100}% + ${display * 14}px)`;
}

function peakLeft(peak: number): string {
  return `min(calc(100% - 16px), ${peak * 100}%)`;
}

const emptyChannel = (): ChannelState => ({ display: 0, peak: 0, peakSetAt: 0, clipped: false });

@Component({
  selector: 'cmaj-level-meter',
  templateUrl: './level-meter.component.html',
  styleUrl: './level-meter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelMeterComponent implements OnDestroy {
  levels = input.required<number[]>();
  labels = input<string[]>(['L', 'R']);

  private readonly minDb = -60;
  private readonly maxDb = 0;
  private readonly peakHoldMs = 1000;
  private readonly decayPerSecond = 0.6;

  readonly channels = signal<ChannelState[]>(this.labels().map(emptyChannel));

  readonly unlitWidth = unlitWidth;
  readonly peakLeft = peakLeft;

  private lastFrame = performance.now();
  private rafId: number;

  constructor() {
    this.rafId = requestAnimationFrame(this.tick);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  clearAllClips(): void {
    this.channels.update(channels => channels.map(c => ({ ...c, clipped: false })));
  }

  private toNormalized(linear: number): number {
    if (linear <= 0) return 0;
    const db = 20 * Math.log10(linear);
    return Math.min(1, Math.max(0, (db - this.minDb) / (this.maxDb - this.minDb)));
  }

  private readonly tick = (now: number): void => {
    const elapsedSeconds = (now - this.lastFrame) / 1000;
    this.lastFrame = now;

    const levels = this.levels();

    this.channels.update(channels =>
      levels.map((linear, index) => {
        const channel = channels[index] ?? emptyChannel();
        const target = this.toNormalized(linear);

        const display =
          target >= channel.display
            ? target
            : Math.max(target, channel.display - this.decayPerSecond * elapsedSeconds);

        let { peak, peakSetAt } = channel;

        if (display >= peak) {
          peak = display;
          peakSetAt = now;
        } else if (now - peakSetAt > this.peakHoldMs) {
          peak = Math.max(display, peak - this.decayPerSecond * elapsedSeconds);
        }

        return { display, peak, peakSetAt, clipped: channel.clipped || linear >= 1.0 };
      }),
    );

    this.rafId = requestAnimationFrame(this.tick);
  };
}
