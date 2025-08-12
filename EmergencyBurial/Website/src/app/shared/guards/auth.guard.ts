import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';

import {AuthContextService} from "../services/auth-context.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authCtx: AuthContextService, private router: Router) {
  }

  async canActivate(): Promise<boolean | UrlTree> {

    const isAuth = this.authCtx.isLoggedIn();

    return isAuth ? true : this.router.createUrlTree(['/login']);
  }
}
