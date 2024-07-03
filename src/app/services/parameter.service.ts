import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  private readonly parameters: Map<PatchConnectionEndpoint, WritableSignal<any>> = new Map<
    PatchConnectionEndpoint,
    WritableSignal<any>
  >();

  constructor(private patchConnectionService: PatchConnectionService) {}

  addParameter<T>(endpointId: PatchConnectionEndpoint, defaultValue: T): Signal<T> {
    let parameter = this.parameters.get(endpointId);
    if (!parameter) {
      parameter = signal<undefined | T>(defaultValue);
      this.parameters.set(endpointId, parameter);

      const callback = (value: T) => parameter?.set(value);
      this.patchConnectionService.addParameterListener(endpointId, callback);
    }
    return parameter.asReadonly();
  }

  sendParameterValue(args: { endpointID: PatchConnectionEndpoint; value: any }) {
    const { endpointID: endpointId, value: newValue } = args;
    const paramToUpdate = this.parameters.get(endpointId);

    if (paramToUpdate != null && paramToUpdate() !== newValue) {
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
