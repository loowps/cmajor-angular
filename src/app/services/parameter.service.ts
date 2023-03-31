import { Injectable } from '@angular/core';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  private readonly parameters: Map<PatchConnectionEndpoint, BehaviorSubject<any>> = new Map();

  constructor(private patchConnectionService: PatchConnectionService) {
    this.updateParameterValue = this.updateParameterValue.bind(this);
    patchConnectionService.setOnParameterEndpointChangedCallback(this.updateParameterValue);
  }

  registerParameter<T>(endpointId: PatchConnectionEndpoint): Observable<undefined | T> {
    let parameter = this.parameters.get(endpointId);
    if (!parameter) {
      parameter = new BehaviorSubject<undefined | T>(undefined);
      this.parameters.set(endpointId, parameter);
    }
    return parameter.asObservable();
  }

  updateParameterValue(
    args: { endpointID: PatchConnectionEndpoint; value: any },
    sendToPatch = false,
  ) {
    const { endpointID: endpointId, value: newValue } = args;
    const paramToUpdate = this.parameters.get(endpointId);

    if (paramToUpdate != null && paramToUpdate.getValue() !== newValue) {
      if (sendToPatch) {
        this.patchConnectionService.sendParameterValue(endpointId, newValue);
      }
      paramToUpdate.next(newValue);
    }
  }

  requestParameterValue(endpointId: PatchConnectionEndpoint): void {
    this.patchConnectionService.requestEndpointValue(endpointId);
  }

  sendParameterGestureStart(endpointId: PatchConnectionEndpoint): void {
    this.patchConnectionService.sendParameterGestureStart(endpointId);
  }

  sendParameterGestureEnd(endpointId: PatchConnectionEndpoint): void {
    this.patchConnectionService.sendParameterGestureEnd(endpointId);
  }
}
