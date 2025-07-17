import {Injectable, Injector} from '@angular/core';
import {BaseService} from "../../core/abstract/base-service";
import {IUserOtp} from "../model/user-otp";
import {TokenResponse} from "../model/token-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(protected injector: Injector) {
    super("AccountService", injector);
  }

  login(userOtp: IUserOtp): Promise<TokenResponse> {

    return super.put({path: '/login', body: userOtp});

  }

  test(): Promise<any> {
    return super.get({path: '/protected-data'});
  }
}
