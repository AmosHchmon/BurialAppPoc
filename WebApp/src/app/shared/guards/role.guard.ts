import {Injectable} from '@angular/core';
import {Router, CanMatch, Route, UrlSegment} from '@angular/router';
import {AuthContextService} from '../services/auth-context.service';
import {enmOrganizationType} from '../enum/organization-type.enum';

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanMatch {
  constructor(private authCtx: AuthContextService, private router: Router) {
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean {

    const roles = route.data && route.data['roles'];

    return this.checkRole(roles);
  }

  private checkRole(expectedRoles: enmOrganizationType[]): boolean {

    if (!expectedRoles || expectedRoles.includes(enmOrganizationType.All)) {
      return true;
    }

    const userRoles = this.authCtx.getUserRole;
    const hasRole = expectedRoles.includes(userRoles);

    if (!hasRole) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
