import { TestBed } from '@angular/core/testing';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { PatchConnection } from 'src/app/services/patch-connection.model';

describe('PatchConnectionService', () => {
  let service: PatchConnectionService;

  let patchConnection: PatchConnection;

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
      const endpointId = PatchConnectionEndpoint.Gain;
      service.requestEndpointValue(endpointId);

      expect(patchConnection.requestEndpointValue).toHaveBeenCalledTimes(1);
      expect(patchConnection.requestEndpointValue).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('sendParameterGestureStart function', () => {
    it('should call sendParameterGestureStart', () => {
      const endpointId = PatchConnectionEndpoint.Gain;
      service.sendParameterGestureStart(endpointId);

      expect(patchConnection.sendParameterGestureStart).toHaveBeenCalledTimes(1);
      expect(patchConnection.sendParameterGestureStart).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('sendParameterGestureEnd function', () => {
    it('should call sendParameterGestureEnd', () => {
      const endpointId = PatchConnectionEndpoint.Gain;
      service.sendParameterGestureEnd(endpointId);

      expect(patchConnection.sendParameterGestureEnd).toHaveBeenCalledTimes(1);
      expect(patchConnection.sendParameterGestureEnd).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('onParameterEndpointChanged function', () => {
    it('should update gain with new value', done => {
      const endpointId = PatchConnectionEndpoint.Gain;
      const newValue = 123;
      service.onParameterEndpointChanged(endpointId, newValue);

      service.$gain.subscribe(value => {
        expect(value).toEqual(newValue);
        done();
      });
    });

    it('should not update gain given no matching endpoint', done => {
      const newValue = 123;
      service.onParameterEndpointChanged(undefined!, newValue);

      service.$gain.subscribe(value => {
        expect(value).toEqual(0);
        done();
      });
    });
  });

  describe('sendGainValue function', () => {
    it('should call sendEventOrValue with gain endpointID and new value', () => {
      const newValue = 123;
      service.sendGainValue(newValue);

      expect(patchConnection.sendEventOrValue).toHaveBeenCalledTimes(1);
      expect(patchConnection.sendEventOrValue).toHaveBeenCalledWith(
        PatchConnectionEndpoint.Gain,
        newValue,
      );
    });
  });
});
