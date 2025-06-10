import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgHttpLoaderComponent, pendingRequestsInterceptor$} from 'ng-http-loader';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {AppRoutingModule} from './app.routing';
import {routes} from './app.routing';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgHttpLoaderComponent,
  ],
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([pendingRequestsInterceptor$])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
