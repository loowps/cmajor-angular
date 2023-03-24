import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutViewComponent } from 'src/app/layout/about-view/about-view.component';

describe('AboutComponent', () => {
  let component: AboutViewComponent;
  let fixture: ComponentFixture<AboutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
