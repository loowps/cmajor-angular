import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { TopBarComponent } from 'src/app/layout/top-bar/top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent],
      providers: [
        provideRouter([
          { path: '', component: TopBarComponent },
          { path: 'about', component: TopBarComponent },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isAbout', () => {
    it('should be false on home route', async () => {
      await router.navigate(['/']);
      expect(component.isAbout()).toBe(false);
    });

    it('should be true on /about route', async () => {
      await router.navigate(['/about']);
      expect(component.isAbout()).toBe(true);
    });
  });
});
