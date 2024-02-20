import { Routes } from '@angular/router';
import { ParameterViewComponent } from 'src/app/layout/parameter-view/parameter-view.component';
import { AboutViewComponent } from 'src/app/layout/about-view/about-view.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: ParameterViewComponent,
  },
  {
    path: 'about',
    component: AboutViewComponent,
  },
];
