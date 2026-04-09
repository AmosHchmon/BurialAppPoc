import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { pendingRequestsInterceptor$ } from 'ng-http-loader';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([pendingRequestsInterceptor$])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
	  ),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right', // מומלץ למובייל/PWA
      preventDuplicates: true,
    }),
    importProvidersFrom(MatIconModule)
  ]
};


