import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from 'src/app/layout/top-bar/top-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ToolbarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent, RouterTestingModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TopBarComponent);
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
