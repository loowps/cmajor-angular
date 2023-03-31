import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnobComponent } from 'src/app/components/knob/knob.component';
import { Observable } from 'rxjs';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { ParameterService } from 'src/app/services/parameter.service';

@Component({
  selector: 'cmaj-parameter-view',
  standalone: true,
  imports: [CommonModule, KnobComponent],
  templateUrl: './parameter-view.component.html',
  styleUrls: ['./parameter-view.component.scss'],
})
export class ParameterViewComponent implements OnInit {
  readonly $gain: Observable<undefined | number>;

  private readonly gainEndpoint = PatchConnectionEndpoint.Gain;

  constructor(private parameterService: ParameterService) {
    this.$gain = parameterService.registerParameter<undefined | number>(this.gainEndpoint);
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
    this.parameterService.updateParameterValue(
      { endpointID: this.gainEndpoint, value: newValue },
      true,
    );
  }
}
