import { createApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from 'src/app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import 'zone.js';

const cmajViewElementTag = 'cmaj-view';

createApplication({
  providers: [provideAnimations(), provideRouter(appRoutes)],
})
  .then((appRef: ApplicationRef) => {
    const ngElementConstructor = createCustomElement(AppComponent, {
      injector: appRef.injector,
    });
    if (!customElements.get(cmajViewElementTag)) {
      customElements.define(cmajViewElementTag, ngElementConstructor);
    }
  })
  .catch(err => console.error(err));

export default function createCustomPatchView(patchConnection: any) {
  const cmajView = document.createElement(cmajViewElementTag);
  window['patchConnection' as any] = patchConnection;
  return cmajView;
}
