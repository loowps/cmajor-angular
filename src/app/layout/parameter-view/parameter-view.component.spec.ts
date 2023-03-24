import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParameterViewComponent } from 'src/app/layout/parameter-view/parameter-view.component';
import { PatchConnectionService } from 'src/app/services/patch-connection.service';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

describe('MainPanelComponent', () => {
  let component: ParameterViewComponent;
  let fixture: ComponentFixture<ParameterViewComponent>;

  let patchConnectionService: PatchConnectionService;
  let requestEndpointValue: jest.SpyInstance;
  let sendParameterGestureStart: jest.SpyInstance;
  let sendParameterGestureEnd: jest.SpyInstance;
  let sendGainValue: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterViewComponent],
    }).compileComponents();

    patchConnectionService = TestBed.inject(PatchConnectionService);

    requestEndpointValue = jest
      .spyOn(patchConnectionService, 'requestEndpointValue')
      .mockImplementation();

    sendParameterGestureStart = jest
      .spyOn(patchConnectionService, 'sendParameterGestureStart')
      .mockImplementation();

    sendParameterGestureEnd = jest
      .spyOn(patchConnectionService, 'sendParameterGestureEnd')
      .mockImplementation();

    sendGainValue = jest.spyOn(patchConnectionService, 'sendGainValue').mockImplementation();

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
      expect(sendParameterGestureStart).toHaveBeenCalledWith(PatchConnectionEndpoint.Gain);
    });
  });

  describe('handleEndGainValueChange function', () => {
    it('should call sendParameterGestureEnd once', () => {
      component.handleEndGainValueChange();

      expect(sendParameterGestureEnd).toHaveBeenCalledTimes(1);
      expect(sendParameterGestureEnd).toHaveBeenCalledWith(PatchConnectionEndpoint.Gain);
    });
  });

  describe('handleGainValueChange function', () => {
    it('should call sendGainValue once', () => {
      const newValue = 123;
      component.handleGainValueChange(newValue);

      expect(sendGainValue).toHaveBeenCalledTimes(1);
      expect(sendGainValue).toHaveBeenCalledWith(newValue);
    });
  });
});
