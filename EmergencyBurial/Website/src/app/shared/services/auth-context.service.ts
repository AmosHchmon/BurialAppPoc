import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SessionStorageService} from 'ngx-webstorage';
import {IMember} from "../model/member";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AuthContextService {
  // #region [properties]

  constructor(private session: SessionStorageService) {
  }

  get Member(): IMember {
    return this.session.retrieve("member");
  }

  set Member(val: IMember) {
    this.session.store("member", val);
  }

  isLoggedIn() {
    return !!this.Member;
  }

  // אתאים את זה למערכת כאשר יהיו לנו הרשאות
  isAdmin(){
    return true;
  }

}
