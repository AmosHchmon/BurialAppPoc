import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError} from "rxjs/internal/operators/catchError";
import {throwError} from "rxjs";
import {Router} from "@angular/router"
import {inject} from "@angular/core";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const router = inject(Router);

  const clonedRequest = req.clone({
    withCredentials: true,
  })

  return next(clonedRequest).pipe(

    catchError((error: any) => {

      if (error instanceof HttpErrorResponse && error.status === 401) {
        router.navigate(['/login'])
      }

      return throwError(() => error);
    })
  );
}
