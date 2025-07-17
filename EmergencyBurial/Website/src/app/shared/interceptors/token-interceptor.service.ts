import {HttpHandlerFn, HttpRequest} from '@angular/common/http';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const clonedRequest = req.clone({
    withCredentials: true,
  })

  return next(clonedRequest);
}
