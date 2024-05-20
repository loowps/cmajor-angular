import { TestBed } from '@angular/core/testing';
import { ParameterService } from 'src/app/services/parameter.service';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { PATCH_CONNECTION } from 'src/main';

describe('ParameterService', () => {
  let service: ParameterService;
  let patchConnectionService: PatchConnectionService;

  const endpointId = 'xyz' as PatchConnectionEndpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PATCH_CONNECTION, useValue: (window.parent as any).patchConnection }],
    });
    patchConnectionService = TestBed.inject(PatchConnectionService);

    service = TestBed.inject(ParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('param lifecycle: addParameter and sendParameterValue function', () => {
    it('should add a new param once that can be updated', () => {
      const newValue = 123;
      const sentValue = 456;
      const sendParameterValue = jest
        .spyOn(patchConnectionService, 'sendParameterValue')
        .mockImplementation();

      const addParameterListener = jest
        .spyOn(patchConnectionService, 'addParameterListener')
        .mockImplementation();

      const addedParameter = service.addParameter(endpointId, 0);

      expect(addParameterListener).toHaveBeenCalledTimes(1);
      expect(addParameterListener).toHaveBeenCalledWith(endpointId, expect.any(Function));

      addParameterListener.mock.calls[0][1](newValue);

      service.sendParameterValue({ endpointID: endpointId, value: newValue });
      service.sendParameterValue({ endpointID: endpointId, value: sentValue });

      expect(sendParameterValue).toHaveBeenCalledTimes(1);
      expect(sendParameterValue).toHaveBeenCalledWith(endpointId, sentValue);
      expect(addedParameter()).toEqual(newValue);
    });
  });

  describe('requestParameterValue function', () => {
    it('should call requestEndpointValue of patchConnectionService', () => {
      const requestEndpointValue = jest
        .spyOn(patchConnectionService, 'requestEndpointValue')
        .mockImplementation();

      service.requestParameterValue(endpointId);

      expect(requestEndpointValue).toHaveBeenCalledTimes(1);
      expect(requestEndpointValue).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('sendParameterGestureStart function', () => {
    it('should call sendParameterGestureStart of patchConnectionService', () => {
      const sendParameterGestureStart = jest
        .spyOn(patchConnectionService, 'sendParameterGestureStart')
        .mockImplementation();

      service.sendParameterGestureStart(endpointId);

      expect(sendParameterGestureStart).toHaveBeenCalledTimes(1);
      expect(sendParameterGestureStart).toHaveBeenCalledWith(endpointId);
    });
  });

  describe('sendParameterGestureEnd function', () => {
    it('should call sendParameterGestureEnd of patchConnectionService', () => {
      const sendParameterGestureEnd = jest
        .spyOn(patchConnectionService, 'sendParameterGestureEnd')
        .mockImplementation();

      service.sendParameterGestureEnd(endpointId);

      expect(sendParameterGestureEnd).toHaveBeenCalledTimes(1);
      expect(sendParameterGestureEnd).toHaveBeenCalledWith(endpointId);
    });
  });
});
