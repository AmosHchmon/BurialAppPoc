import {Injectable, Injector} from '@angular/core';
import {BaseService} from "../../core/abstract/base-service";
import {IUserOtp} from "../model/user-otp";
import {TokenResponse} from "../model/token-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private authStatus: boolean | null = null;

  constructor(protected injector: Injector) {
    super("AccountService", injector);
  }

  login(userOtp: IUserOtp): Promise<TokenResponse> {

    this.authStatus = null;
    return super.put({path: '/login', body: userOtp});
  }

  async isAuthenticated(): Promise<boolean> {

    if (this.authStatus !== null) {
      return this.authStatus;
    }

    try {

      const res = await super.get<{ authenticated: boolean }>({path: '/status'});

      this.authStatus = res?.authenticated ?? false;

      return this.authStatus;

    } catch (err) {

      this.authStatus = false;
      return false;
    }
  }

  clearAuthCache(): void {
    this.authStatus = null;
  }

  test(): Promise<any> {
    return super.get({path: '/protected-data'});
  }
}
