import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthContextService } from '../services/auth-context.service';
import { enmOrganizationType } from '../enum/organization-type.enum';
import { AlertType } from 'src/app/core/enums/alert.enum';
import { AlertService } from '../services/alert.service';
import { DialogMessage } from '../static/messages';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authCtx: AuthContextService,private alertService: AlertService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as enmOrganizationType[];
    if(expectedRoles.includes(enmOrganizationType.All)){
      return true;
    }

    const userRoles = this.authCtx.getUserRole;
    const hasRole = expectedRoles.includes(userRoles);

    if (!hasRole) {
       this.alertService.alert(AlertType.Error, {ClientMessage: DialogMessage.AccessDenied});
      return false;
    }

    return true;

  }
}
