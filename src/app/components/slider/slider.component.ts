import { Component, input, output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'cmaj-slider',
  imports: [NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  label = input('');

  minValue = input(0);
  maxValue = input(1);
  stepSize = input(0.0001);
  defaultValue = input(0);

  value = input(this.defaultValue(), {
    transform: (value: number) => {
      return this.clamped(value);
    },
  });

  beginChange = output();
  valueChange = output<number>();
  endChange = output();
  resetEvent = output();

  onChange($event: any) {
    const newValue = $event.target.value;
    const clampedValue = this.clamped(newValue);

    if (this.value() !== clampedValue) {
      this.valueChange.emit(clampedValue);
    }
  }

  onMouseUp() {
    this.endChange.emit();
  }

  onMouseDown(event: MouseEvent) {
    if (event.detail === 2) {
      return;
    }
    this.beginChange.emit();
  }

  onDoubleClick() {
    this.resetEvent.emit();
  }

  private clamped(value: number): number {
    return Math.min(Math.max(value, this.minValue()), this.maxValue());
  }
}
