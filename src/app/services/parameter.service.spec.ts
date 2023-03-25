import { TestBed } from '@angular/core/testing';
import { ParameterService } from 'src/app/services/parameter.service';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

describe('ParameterService', () => {
  let service: ParameterService;
  let patchConnectionService: PatchConnectionService;

  let setOnParameterEndpointChangedCallback: jest.SpyInstance;

  const endpointId = 'xyz' as PatchConnectionEndpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    patchConnectionService = TestBed.inject(PatchConnectionService);
    setOnParameterEndpointChangedCallback = jest
      .spyOn(patchConnectionService, 'setOnParameterEndpointChangedCallback')
      .mockImplementation();

    service = TestBed.inject(ParameterService);
  });

  it('should be created and init patch connection parameter endpoint changed callback', () => {
    expect(setOnParameterEndpointChangedCallback).toHaveBeenCalledTimes(1);
    expect(setOnParameterEndpointChangedCallback).toHaveBeenCalledWith(
      service.updateParameterValue,
    );
    expect(service).toBeTruthy();
  });

  describe('param lifecycle: registerParameter and updateParameterValue function', () => {
    it('should register a new param once that can be updated', done => {
      const newValue = 123;
      const sendParameterValue = jest
        .spyOn(patchConnectionService, 'sendParameterValue')
        .mockImplementation();

      const paramObservable = service.registerParameter(endpointId);
      service.registerParameter(endpointId);

      paramObservable.subscribe(value => {
        expect(sendParameterValue).toHaveBeenCalledTimes(1);
        expect(sendParameterValue).toHaveBeenCalledWith(endpointId, newValue);

        expect(value).toEqual(newValue);
        done();
      });

      service.updateParameterValue(endpointId, newValue, true);
      service.updateParameterValue(endpointId, newValue);
      service.updateParameterValue('unknownEndpoint' as PatchConnectionEndpoint, 456);
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
