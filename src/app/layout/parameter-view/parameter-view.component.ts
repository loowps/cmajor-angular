import {
  Component,
  OnDestroy,
  OnInit,
  Signal,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { LevelMeterComponent } from 'src/app/components/level-meter/level-meter.component';

@Component({
  selector: 'cmaj-parameter-view',
  imports: [SliderComponent, LevelMeterComponent],
  templateUrl: './parameter-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./parameter-view.component.scss'],
})
export class ParameterViewComponent implements OnInit, OnDestroy {
  private parameterService = inject(ParameterService);
  private patchConnectionService = inject(PatchConnectionService);

  readonly gain: Signal<number>;
  readonly levels = signal<number[]>([0, 0]);

  private readonly gainEndpoint = PatchConnectionEndpoint.Gain;
  private readonly levelEndpoint = PatchConnectionEndpoint.Level;

  private readonly onLevelChange = (newLevels: number[]): void => {
    this.levels.set(newLevels);
  };

  constructor() {
    this.gain = this.parameterService.addParameter<number>(this.gainEndpoint, 0);
    this.patchConnectionService.addEndpointListener(this.levelEndpoint, this.onLevelChange);
  }

  ngOnInit(): void {
    this.parameterService.requestParameterValue(this.gainEndpoint);
  }

  ngOnDestroy(): void {
    this.patchConnectionService.removeEndpointListener(this.levelEndpoint, this.onLevelChange);
  }

  handleBeginGainValueChange(): void {
    this.parameterService.sendParameterGestureStart(this.gainEndpoint);
  }

  handleEndGainValueChange(): void {
    this.parameterService.sendParameterGestureEnd(this.gainEndpoint);
  }

  handleGainValueChange(newValue: number): void {
    this.parameterService.sendParameterValue({ endpointID: this.gainEndpoint, value: newValue });
  }
}
