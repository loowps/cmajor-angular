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

      expect(patchConnection.requestParameterValue).toHaveBeenCalledTimes(1);
      expect(patchConnection.requestParameterValue).toHaveBeenCalledWith(endpointId);
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

  describe('addParameterListener function', () => {
    it('should call addParameterListener and execute callback with new value ', () => {
      const newValue = 123;
      const callback = jest.fn();

      service.addParameterListener(endpointId, callback);

      expect(patchConnection.addParameterListener).toHaveBeenCalledTimes(1);
      expect(patchConnection.addParameterListener).toHaveBeenCalledWith(
        endpointId,
        expect.any(Function),
      );

      (patchConnection.addParameterListener as jest.Mock).mock.calls[0][1](newValue);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(newValue);
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
