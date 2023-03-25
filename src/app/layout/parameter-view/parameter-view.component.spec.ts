import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParameterViewComponent } from 'src/app/layout/parameter-view/parameter-view.component';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { ParameterService } from 'src/app/services/parameter.service';

describe('ParameterViewComponent', () => {
  let component: ParameterViewComponent;
  let fixture: ComponentFixture<ParameterViewComponent>;

  let parameterService: ParameterService;
  let requestParameterValue: jest.SpyInstance;
  let sendParameterGestureStart: jest.SpyInstance;
  let sendParameterGestureEnd: jest.SpyInstance;
  let updateParameterValue: jest.SpyInstance;

  const gainEndpointId = PatchConnectionEndpoint.Gain;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterViewComponent],
    }).compileComponents();

    parameterService = TestBed.inject(ParameterService);

    requestParameterValue = jest
      .spyOn(parameterService, 'requestParameterValue')
      .mockImplementation();

    sendParameterGestureStart = jest
      .spyOn(parameterService, 'sendParameterGestureStart')
      .mockImplementation();

    sendParameterGestureEnd = jest
      .spyOn(parameterService, 'sendParameterGestureEnd')
      .mockImplementation();

    updateParameterValue = jest
      .spyOn(parameterService, 'updateParameterValue')
      .mockImplementation();

    fixture = TestBed.createComponent(ParameterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleBeginGainValueChange function', () => {
    it('should call sendParameterGestureStart once', () => {
      component.handleBeginGainValueChange();

      expect(sendParameterGestureStart).toHaveBeenCalledTimes(1);
      expect(sendParameterGestureStart).toHaveBeenCalledWith(gainEndpointId);
    });
  });

  describe('handleEndGainValueChange function', () => {
    it('should call sendParameterGestureEnd once', () => {
      component.handleEndGainValueChange();

      expect(sendParameterGestureEnd).toHaveBeenCalledTimes(1);
      expect(sendParameterGestureEnd).toHaveBeenCalledWith(gainEndpointId);
    });
  });

  describe('handleGainValueChange function', () => {
    it('should call updateParameterValue once', () => {
      const newValue = 123;
      component.handleGainValueChange(newValue);

      expect(updateParameterValue).toHaveBeenCalledTimes(1);
      expect(updateParameterValue).toHaveBeenCalledWith(gainEndpointId, newValue, true);
    });
  });
});
