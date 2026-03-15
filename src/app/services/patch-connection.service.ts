import { inject, Injectable } from '@angular/core';
import { PatchConnection } from 'src/app/services/patch-connection.model';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { PATCH_CONNECTION } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class PatchConnectionService {
  private patchConnection: PatchConnection = inject<PatchConnection>(PATCH_CONNECTION);

  requestEndpointValue(endpointId: PatchConnectionEndpoint): void {
    this.patchConnection.requestParameterValue(endpointId);
  }

  sendParameterGestureStart(endpointId: PatchConnectionEndpoint): void {
    this.patchConnection.sendParameterGestureStart(endpointId);
  }

  sendParameterValue(endpointId: PatchConnectionEndpoint, newValue: any) {
    this.patchConnection.sendEventOrValue(endpointId, newValue);
  }

  sendParameterGestureEnd(endpointId: PatchConnectionEndpoint): void {
    this.patchConnection.sendParameterGestureEnd(endpointId);
  }

  addParameterListener(endpointId: PatchConnectionEndpoint, callback: (value: any) => void) {
    const onChange = (newValue: any) => {
      callback(newValue);
    };
    this.patchConnection.addParameterListener(endpointId, onChange);
  }
}
