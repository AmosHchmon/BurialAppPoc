import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrimPipe } from './pipes/trim';
import { ErrorServerInterceptor } from './interceptors/error-server-interceptor.service';
import { MatConvertTimezoneDirective } from './directives/mat-convert-timezone.directive';
import { TokenInterceptor } from '../shared/interceptors/token-interceptor.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  imports: [],
  exports: [
    MatConvertTimezoneDirective
  ],
  declarations: [TrimPipe,MatConvertTimezoneDirective],
  providers: [
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
})
export class CoreModule {
}
