import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SessionStorageService} from 'ngx-webstorage';
import {IMember} from "../model/member";
import { IAuthUser } from "../model/user";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AuthContextService {
  // #region [properties]

  constructor(private session: SessionStorageService) {
  }

  get UserRBAC(): IAuthUser {
    return this.session.retrieve("member");
  }

  set UserRBAC(val: IAuthUser) {
    this.session.store("member", val);
  }

  isLoggedIn() {
    return !!this.UserRBAC;
  }

  // אתאים את זה למערכת כאשר יהיו לנו הרשאות
  isAdmin(){
    return true;
  }

}
