import {Injectable} from '@angular/core';
import {CanActivate, CanMatch, Route, Router, UrlSegment, UrlTree} from '@angular/router';

import {AuthContextService} from "../services/auth-context.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private authCtx: AuthContextService, private router: Router) {
  }

  async canActivate(): Promise<boolean | UrlTree> {

    return this.checkAuth();
  }

  async canMatch(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    return this.checkAuth();
  }

  private checkAuth(): boolean | UrlTree {
    const isAuth = this.authCtx.isLoggedIn();
    return isAuth ? true : this.router.createUrlTree(['/login']);
  }
}
