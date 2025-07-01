import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage} from 'ngx-webstorage';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import {pendingRequestsInterceptor$} from 'ng-http-loader';
import {MAT_DATE_LOCALE} from '@angular/material/core';

import {ErrorServerInterceptor} from './core/interceptors/error-server-interceptor.service';
import {TokenInterceptor} from './shared/interceptors/token-interceptor.service';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([pendingRequestsInterceptor$])),
    provideRouter(routes, withHashLocation()),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorServerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
  ]
};
