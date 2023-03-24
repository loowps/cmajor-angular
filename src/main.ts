import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from 'src/app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideRouter(appRoutes)],
}).catch(err => console.error(err));
