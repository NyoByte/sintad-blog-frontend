import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

(window as any).global = window;

registerLocaleData(es);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));