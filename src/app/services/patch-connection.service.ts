import { Injectable, NgZone } from '@angular/core';
import { PatchConnection } from 'src/app/services/patch-connection.model';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class PatchConnectionService {
  private readonly patchConnection?: PatchConnection;

  constructor(private ngZone: NgZone) {
    this.patchConnection = (window.parent as any).patchConnection;
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

  addParameterListener(endpointId: PatchConnectionEndpoint, callback: (value: any) => void) {
    const onChange = (newValue: any) => {
      this.ngZone.run(() => callback(newValue));
    };
    this.patchConnection?.addParameterListener(endpointId, onChange);
  }
}
