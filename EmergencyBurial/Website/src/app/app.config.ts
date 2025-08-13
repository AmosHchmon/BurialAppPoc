import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage} from 'ngx-webstorage';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/Aura';
import {provideToastr} from "ngx-toastr";
import {MessageService} from "primeng/api";
import {pendingRequestsInterceptor$} from "ng-http-loader";

import {routes} from './app.routes';
import {httpInterceptor} from "./shared/interceptors/http-interceptor.service";
import {GlobalErrorHandlerService} from "./shared/services/global-error-handler.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      },
      ripple: true
    }),
    MessageService,
    provideCharts(withDefaultRegisterables()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([httpInterceptor, pendingRequestsInterceptor$]),
    ),
    provideRouter(routes, withHashLocation()),
    provideNgxWebstorage(
      withNgxWebstorageConfig({separator: ':', caseSensitive: true}),
      withLocalStorage(),
      withSessionStorage()
    ),
    {provide: MAT_DATE_LOCALE, useValue: 'he-IL'},
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ]
};
