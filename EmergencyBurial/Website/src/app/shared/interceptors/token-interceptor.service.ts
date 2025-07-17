import {HttpHandlerFn, HttpRequest} from '@angular/common/http';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
console.log("1")
  const clonedRequest = req.clone({
    withCredentials: true,
  })
  console.log("2")
  return next(clonedRequest);
}
