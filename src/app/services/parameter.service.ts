import { Injectable, OnDestroy, Signal, WritableSignal, inject, signal } from '@angular/core';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class ParameterService implements OnDestroy {
  private patchConnectionService = inject(PatchConnectionService);

  private readonly parameters = new Map<PatchConnectionEndpoint, WritableSignal<any>>();
  private readonly callbacks = new Map<PatchConnectionEndpoint, (value: any) => void>();

  addParameter<T>(endpointId: PatchConnectionEndpoint, defaultValue: T): Signal<T> {
    let parameter = this.parameters.get(endpointId);
    if (!parameter) {
      parameter = signal<T>(defaultValue);
      this.parameters.set(endpointId, parameter);

      const callback = (value: T) => parameter!.set(value);
      this.callbacks.set(endpointId, callback);
      this.patchConnectionService.addParameterListener(endpointId, callback);
    }
    return parameter.asReadonly();
  }

  ngOnDestroy(): void {
    this.callbacks.forEach((callback, endpointId) => {
      this.patchConnectionService.removeParameterListener(endpointId, callback);
    });
  }

  sendParameterValue(args: { endpointID: PatchConnectionEndpoint; value: any }): void {
    const { endpointID: endpointId, value: newValue } = args;
    const parameter = this.parameters.get(endpointId);
    if (parameter != null && parameter() !== newValue) {
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
