import { Injectable } from '@angular/core';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  private readonly parameters: Map<PatchConnectionEndpoint, BehaviorSubject<any>> = new Map();

  constructor(private patchConnectionService: PatchConnectionService) {}

  addParameter<T>(endpointId: PatchConnectionEndpoint): Observable<undefined | T> {
    let parameter = this.parameters.get(endpointId);
    if (!parameter) {
      parameter = new BehaviorSubject<undefined | T>(undefined);
      this.parameters.set(endpointId, parameter);

      const callback = (value: any) => parameter?.next(value);
      this.patchConnectionService.addParameterListener(endpointId, callback);
    }
    return parameter.asObservable();
  }

  sendParameterValue(args: { endpointID: PatchConnectionEndpoint; value: any }) {
    const { endpointID: endpointId, value: newValue } = args;
    const paramToUpdate = this.parameters.get(endpointId);

    if (paramToUpdate != null && paramToUpdate.getValue() !== newValue) {
      this.patchConnectionService.sendParameterValue(endpointId, newValue);
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
