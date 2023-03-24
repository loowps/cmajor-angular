import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnobComponent } from 'src/app/components/knob/knob.component';
import { Observable } from 'rxjs';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Component({
  selector: 'cmaj-parameter-view',
  standalone: true,
  imports: [CommonModule, KnobComponent],
  templateUrl: './parameter-view.component.html',
  styleUrls: ['./parameter-view.component.scss'],
})
export class ParameterViewComponent implements OnInit {
  readonly $gain: Observable<any>;

  constructor(private patchConnectionService: PatchConnectionService) {
    this.$gain = patchConnectionService.$gain;
  }

  ngOnInit(): void {
    this.patchConnectionService.requestEndpointValue(PatchConnectionEndpoint.Gain);
  }

  handleBeginGainValueChange() {
    this.patchConnectionService.sendParameterGestureStart(PatchConnectionEndpoint.Gain);
  }

  handleEndGainValueChange() {
    this.patchConnectionService.sendParameterGestureEnd(PatchConnectionEndpoint.Gain);
  }

  handleGainValueChange(newValue: number) {
    this.patchConnectionService.sendGainValue(newValue);
  }
}
