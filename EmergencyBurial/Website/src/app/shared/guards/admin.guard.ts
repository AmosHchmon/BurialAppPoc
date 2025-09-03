import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';

import {AuthContextService} from "../services/auth-context.service";

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authCtx: AuthContextService, private router: Router) {
  }

  async canActivate(): Promise<boolean | UrlTree> {

    const isAdmin = this.authCtx.isAdmin();

    return isAdmin ? true : this.router.createUrlTree(['/login']);
  }
}
