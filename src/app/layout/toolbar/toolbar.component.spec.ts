import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, RouterTestingModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getRouterLink function', () => {
    it.each([
      ['/about', ''],
      ['', '/about'],
    ])("'%s' should return '%s'", (urlSegment, expected) => {
      Object.defineProperty(router, 'url', { value: urlSegment });

      const result = component.getRouterLink();
      expect(result).toEqual(expected);
    });
  });
});
