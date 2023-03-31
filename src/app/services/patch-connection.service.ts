import { Injectable, NgZone } from '@angular/core';
import { PatchConnection } from 'src/app/services/patch-connection.model';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class PatchConnectionService {
  private readonly patchConnection?: PatchConnection;

  private onParameterEndpointChangedCallback?: (args: {
    endpointID: PatchConnectionEndpoint;
    value: any;
  }) => void;

  constructor(private ngZone: NgZone) {
    this.patchConnection = (window.parent as any).patchConnection;

    if (this.patchConnection) {
      this.patchConnection.addAllParameterListener(this.onParameterEndpointChanged.bind(this));
    }
  }

  setOnParameterEndpointChangedCallback(
    callback: (args: { endpointID: PatchConnectionEndpoint; value: any }) => void,
  ) {
    this.onParameterEndpointChangedCallback = callback;
  }

  requestEndpointValue(endpointId: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection?.requestParameterValue(endpointId);
    });
  }

  sendParameterGestureStart(endpointId: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection?.sendParameterGestureStart(endpointId);
    });
  }

  sendParameterValue(endpointId: PatchConnectionEndpoint, newValue: any) {
    this.ngZone.run(() => {
      this.patchConnection?.sendEventOrValue(endpointId, newValue);
    });
  }

  sendParameterGestureEnd(endpointId: PatchConnectionEndpoint): void {
    this.ngZone.run(() => {
      this.patchConnection?.sendParameterGestureEnd(endpointId);
    });
  }

  onParameterEndpointChanged(args: { endpointID: PatchConnectionEndpoint; value: any }) {
    const callback = this.onParameterEndpointChangedCallback;
    if (callback) {
      this.ngZone.run(() => {
        callback(args);
      });
    }
  }
}
