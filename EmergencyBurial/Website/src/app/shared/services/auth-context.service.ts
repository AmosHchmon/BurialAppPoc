import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { IMember } from "../model/member";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AuthContextService {
  // #region [properties]

  get Token(): string {
    return this.session.retrieve("user-token");
  }
  set Token(val: string) {
    this.session.store("user-token", val);
  }

  get Member(): IMember {
    return this.session.retrieve("member");
  }
  set Member(val: IMember) {
    this.session.store("member", val);
  }

  get DecodeToken(): any  {
    return jwtHelper.decodeToken(this.Token);
  }

  constructor(
    private session: SessionStorageService
  ) {}


  isLoggedIn(): Boolean {
    return !!this.Token && !jwtHelper.isTokenExpired(this.Token);
  }
}
