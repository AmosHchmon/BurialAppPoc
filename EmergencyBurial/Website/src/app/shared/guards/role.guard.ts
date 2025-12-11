import {Injectable} from '@angular/core';
import {Router, CanMatch, Route, UrlSegment} from '@angular/router';
import {AuthContextService} from '../services/auth-context.service';
import {enmOrganizationType} from '../enum/organization-type.enum';
import {AlertType} from 'src/app/core/enums/alert.enum';
import {AlertService} from '../services/alert.service';
import {DialogMessage} from '../static/messages';

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanMatch {
  constructor(private authCtx: AuthContextService, private alertService: AlertService, private router: Router) {
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
      this.alertService.alert(AlertType.Error, {ClientMessage: DialogMessage.AccessDenied});

      return false;
    }

    return true;
  }
}
