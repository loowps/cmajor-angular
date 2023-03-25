import { Injectable, NgZone } from '@angular/core';
import { PatchConnection } from 'src/app/services/patch-connection.model';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class PatchConnectionService {
  private readonly patchConnection: PatchConnection;

  private onParameterEndpointChangedCallback?: (
    endpointId: PatchConnectionEndpoint,
    newValue: any,
  ) => void;

  constructor(private ngZone: NgZone) {
    this.patchConnection = (window.parent as any).patchConnection;
    this.patchConnection.onParameterEndpointChanged = this.onParameterEndpointChanged.bind(this);
  }

  setOnParameterEndpointChangedCallback(
    callback: (endpointId: PatchConnectionEndpoint, newValue: any) => void,
  ) {
    this.onParameterEndpointChangedCallback = callback;
  }

  requestEndpointValue(endpointId: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection.requestEndpointValue(endpointId);
    });
  }

  sendParameterGestureStart(endpointId: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection.sendParameterGestureStart(endpointId);
    });
  }

  sendParameterValue(endpointId: PatchConnectionEndpoint, newValue: any) {
    this.ngZone.run(() => {
      this.patchConnection.sendEventOrValue(endpointId, newValue);
    });
  }

  sendParameterGestureEnd(endpointId: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection.sendParameterGestureEnd(endpointId);
    });
  }

  onParameterEndpointChanged(endpointId: PatchConnectionEndpoint, newValue: any) {
    const callback = this.onParameterEndpointChangedCallback;
    if (callback != null) {
      this.ngZone.run(() => {
        callback(endpointId, newValue);
      });
    }
  }
}
