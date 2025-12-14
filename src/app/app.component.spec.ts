import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideTemplate(AppComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
