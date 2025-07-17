import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators/catchError';

@Injectable()
export class ErrorServerInterceptor implements HttpInterceptor {

  constructor(public router: Router) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        case 401://Unauthorized
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        return null;
        case 500://InternalServerError
        case 403://Forbidden
        case 400://BadRequest
        case 405://MethodNotAllowed
        default:
          return throwError(() => error);
      }
    }) as any);
  }

}
