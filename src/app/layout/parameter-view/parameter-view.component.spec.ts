import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ParameterViewComponent } from 'src/app/layout/parameter-view/parameter-view.component';
import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';
import { ParameterService } from 'src/app/services/parameter.service';
import { PATCH_CONNECTION } from 'src/main';

describe('ParameterViewComponent', () => {
  let component: ParameterViewComponent;
  let fixture: ComponentFixture<ParameterViewComponent>;

  let parameterService: ParameterService;
  let requestParameterValue: any;
  let sendParameterGestureStart: any;
  let sendParameterGestureEnd: any;
  let sendParameterValue: any;

  const gainEndpointId = PatchConnectionEndpoint.Gain;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterViewComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PATCH_CONNECTION, useValue: (window.parent as any).patchConnection },
      ],
    }).compileComponents();

    parameterService = TestBed.inject(ParameterService);

    requestParameterValue = vi
      .spyOn(parameterService, 'requestParameterValue')
      .mockImplementation(() => {});

    sendParameterGestureStart = vi
      .spyOn(parameterService, 'sendParameterGestureStart')
      .mockImplementation(() => {});

    sendParameterGestureEnd = vi
      .spyOn(parameterService, 'sendParameterGestureEnd')
      .mockImplementation(() => {});

    sendParameterValue = vi
      .spyOn(parameterService, 'sendParameterValue')
      .mockImplementation(() => {});

    fixture = TestBed.createComponent(ParameterViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(requestParameterValue).toHaveBeenCalledTimes(1);
    expect(requestParameterValue).toHaveBeenCalledWith(gainEndpointId);
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

      expect(sendParameterValue).toHaveBeenCalledTimes(1);
      expect(sendParameterValue).toHaveBeenCalledWith({
        endpointID: gainEndpointId,
        value: newValue,
      });
    });
  });
});
