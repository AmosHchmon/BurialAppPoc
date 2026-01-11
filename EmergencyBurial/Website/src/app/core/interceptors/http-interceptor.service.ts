import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError} from "rxjs/internal/operators/catchError";
import {EMPTY, throwError} from "rxjs";
import {Router} from "@angular/router"
import {inject} from "@angular/core";

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const router = inject(Router);

  const clonedRequest = req.clone({
    withCredentials: true,
  })

  return next(clonedRequest).pipe(

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 401: // Unauthorized
          router.navigate(['/login'], {queryParams: {returnUrl: router.url}});
          return throwError(() => error);

        case 403://Forbidden

          if (req.method === 'GET') {
            router.navigate(['/access-denied']);
            return EMPTY;
          }

          return throwError(() => error);

        case 500: // InternalServerError
        case 400: // BadRequest
        case 405: // MethodNotAllowed
        default:
          return throwError(() => error);

      }
    })
  );
}
