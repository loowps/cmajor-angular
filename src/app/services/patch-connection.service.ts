import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatchConnection } from 'src/app/services/patch-connection.model';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class PatchConnectionService {
  readonly $gain: Observable<any>;

  private readonly gain: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  private readonly patchConnection: PatchConnection;

  constructor(private ngZone: NgZone) {
    this.$gain = this.gain.asObservable();

    this.patchConnection = (window.parent as any).patchConnection;
    this.patchConnection.onParameterEndpointChanged = this.onParameterEndpointChanged.bind(this);
  }

  requestEndpointValue(endpointID: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection.requestEndpointValue(endpointID);
    });
  }

  sendParameterGestureStart(endpointID: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection.sendParameterGestureStart(endpointID);
    });
  }

  sendParameterGestureEnd(endpointID: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection.sendParameterGestureEnd(endpointID);
    });
  }

  onParameterEndpointChanged(endpointID: PatchConnectionEndpoint, newValue: any) {
    if (endpointID === PatchConnectionEndpoint.Gain) {
      this.ngZone.run(() => {
        this.gain.next(newValue);
      });
    }
  }

  sendGainValue(newValue: number) {
    this.patchConnection.sendEventOrValue(PatchConnectionEndpoint.Gain, newValue);
  }
}
