import { TestBed } from '@angular/core/testing';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { PatchConnection } from 'src/app/services/patch-connection.model';

describe('PatchConnectionService', () => {
  let service: PatchConnectionService;

  let patchConnection: PatchConnection;
  const endpointId = PatchConnectionEndpoint.Gain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchConnectionService);

    patchConnection = (window.parent as any).patchConnection as PatchConnection;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('requestEndpointValue function', () => {
    it('should call requestEndpointValue', () => {
      service.requestEndpointValue(endpointId);

      expect(patchConnection.requestEndpointValue).toHaveBeenCalledTimes(1);
      expect(patchConnection.requestEndpointValue).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('sendParameterGestureStart function', () => {
    it('should call sendParameterGestureStart', () => {
      service.sendParameterGestureStart(endpointId);

      expect(patchConnection.sendParameterGestureStart).toHaveBeenCalledTimes(1);
      expect(patchConnection.sendParameterGestureStart).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('sendParameterGestureEnd function', () => {
    it('should call sendParameterGestureEnd', () => {
      service.sendParameterGestureEnd(endpointId);

      expect(patchConnection.sendParameterGestureEnd).toHaveBeenCalledTimes(1);
      expect(patchConnection.sendParameterGestureEnd).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('onParameterEndpointChanged function', () => {
    it('should execute callback with endpointId and new value ', () => {
      const newValue = 123;
      const callback = jest.fn();

      service.onParameterEndpointChanged(endpointId, newValue);

      service.setOnParameterEndpointChangedCallback(callback);
      service.onParameterEndpointChanged(endpointId, newValue);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(endpointId, newValue);
    });
  });

  describe('sendParameterValue function', () => {
    it('should call sendEventOrValue with endpointId and new value', () => {
      const newValue = 123;

      service.sendParameterValue(endpointId, newValue);

      expect(patchConnection.sendEventOrValue).toHaveBeenCalledTimes(1);
      expect(patchConnection.sendEventOrValue).toHaveBeenCalledWith(endpointId, newValue);
    });
  });
});
