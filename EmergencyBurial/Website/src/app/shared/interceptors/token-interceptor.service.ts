import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthContextService} from '../services/auth-context.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authCtx: AuthContextService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (true) {
      request = request.clone({
        setHeaders: {
          //Authorization: 'Bearer ' + this.authCtx.Token,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
        }
      });
    }
    return next.handle(request);
  }
}
