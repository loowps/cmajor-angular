import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { appRoutes } from 'src/app/app.routes';
import 'zone.js';
import { PatchConnection } from 'src/app/services/patch-connection.model';
import { AppComponent } from 'src/app/app.component';
import { InjectionToken } from '@angular/core';

const cmajViewElementTag = 'cmaj-app';

export const PATCH_CONNECTION = new InjectionToken<PatchConnection>('patchConnection');

class CmajApp extends HTMLElement {
  private patchConnection?: PatchConnection;

  constructor(patchConnection: PatchConnection) {
    super();
    this.patchConnection = patchConnection;
  }

  connectedCallback() {
    bootstrapApplication(AppComponent, {
      providers: [
        { provide: PATCH_CONNECTION, useValue: this.patchConnection },
        provideRouter(appRoutes, withViewTransitions(), withHashLocation()),
      ],
    }).catch(err => console.error(err));
  }
}

window.customElements.define(cmajViewElementTag, CmajApp);

export default function createPatchView(patchConnection: PatchConnection) {
  return new CmajApp(patchConnection);
}
