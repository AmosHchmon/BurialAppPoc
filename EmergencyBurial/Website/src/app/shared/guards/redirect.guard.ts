import {Injectable} from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';

import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean | UrlTree> {

    const isAuth = await this.authService.isAuthenticated();

    return isAuth ? this.router.createUrlTree(['/dashboard/home']) : true;
  }
}
