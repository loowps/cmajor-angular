import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { ParameterService } from 'src/app/services/parameter.service';
import { SliderComponent } from 'src/app/components/slider/slider.component';

@Component({
  selector: 'cmaj-parameter-view',
  imports: [CommonModule, SliderComponent],
  templateUrl: './parameter-view.component.html',
  styleUrls: ['./parameter-view.component.scss'],
})
export class ParameterViewComponent implements OnInit {
  readonly gain: Signal<number>;

  private readonly gainEndpoint = PatchConnectionEndpoint.Gain;

  constructor(private parameterService: ParameterService) {
    this.gain = parameterService.addParameter<number>(this.gainEndpoint, 0);
  }

  ngOnInit(): void {
    this.parameterService.requestParameterValue(this.gainEndpoint);
  }

  handleBeginGainValueChange() {
    this.parameterService.sendParameterGestureStart(this.gainEndpoint);
  }

  handleEndGainValueChange() {
    this.parameterService.sendParameterGestureEnd(this.gainEndpoint);
  }

  handleGainValueChange(newValue: number) {
    this.parameterService.sendParameterValue({ endpointID: this.gainEndpoint, value: newValue });
  }
}
