import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthContextService } from '../services/auth-context.service';
import { enmOrganizationType } from '../enum/organization-type.enum';

/**
 * RoleGuard checks route.data.roles (string or string[]) and allows navigation
 * only if the current user has at least one of the required roles.
 *
 * Usage in route config:
 *  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } }
 */
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authCtx: AuthContextService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as enmOrganizationType[];
    if(expectedRoles.includes(enmOrganizationType.All)){
      return true;
    }

    const userRoles = this.authCtx.getUserRole;
    const hasRole = expectedRoles.includes(userRoles);

    if (!hasRole) {
      alert("access-denied");
      //this.router.navigate(['/access-denied']);
      return false;
    }

    return true;

  }
}
