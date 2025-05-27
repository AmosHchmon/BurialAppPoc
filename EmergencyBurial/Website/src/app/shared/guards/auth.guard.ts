import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthContextService } from "../services/auth-context.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {

  constructor(private router: Router,private authCtx:AuthContextService,) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (this.authCtx.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/sessions/login"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }



  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authCtx.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/sessions/login"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }

  }
}
