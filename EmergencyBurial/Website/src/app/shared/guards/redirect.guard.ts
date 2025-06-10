import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthContextService } from '../services/auth-context.service';

@Injectable({providedIn: 'root'})
export class RedirectGuard {
    constructor(public router: Router,private authCtx:AuthContextService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.authCtx.isLoggedIn()) {
             this.router.navigate(["/sessions/login"], {
                queryParams: {
                return: state.url
                }
            });
            this.router.navigate(['sessions/login']);
            return false;

        } else {

            const claims = this.authCtx.DecodeToken;

            /* switch (parseInt(claims['RoleId'])) {
                case enmMemberType.SystemManager:
                case enmMemberType.CouncilAccountant:
                case enmMemberType.FirstAuthorizedSignatory:
                case enmMemberType.SecondAuthorizedSignatory:
                case enmMemberType.AccompanyingAccountant:
                case enmMemberType.OfficeBudgetDepartment:
                case enmMemberType.OfficeAdministration:
               default:
                 this.router.navigate(['/report']);
             }*/

            return true;

        }



    }
}
