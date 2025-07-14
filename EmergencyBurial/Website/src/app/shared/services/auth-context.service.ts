import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SessionStorageService} from 'ngx-webstorage';
import {CookieService} from 'ngx-cookie-service';
import {IMember} from "../model/member";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AuthContextService {
  // #region [properties]

  get Token(): string {
    return this.cookieService.get('user_token') || null;
  }

  set Token(val: string) {

    if (val) {
      this.cookieService.set('user_token', val, {secure: true, sameSite: 'Lax'});
    } else {
      this.cookieService.delete('user_token');
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  get Member(): IMember {
    return this.session.retrieve("member");
  }

  set Member(val: IMember) {
    this.session.store("member", val);
  }

  get DecodeToken(): any {
    return jwtHelper.decodeToken(this.Token);
  }

  constructor(
    private session: SessionStorageService,
    private cookieService: CookieService,
  ) {
  }

  isLoggedIn(): boolean {
    return !!this.Token && !jwtHelper.isTokenExpired(this.Token);
  }
}
