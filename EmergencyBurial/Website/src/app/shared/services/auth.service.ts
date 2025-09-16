import {Injectable, Injector} from '@angular/core';
import {BaseService} from "../../core/abstract/base-service";
import {IUserOtp} from "../model/user-otp";
import {TokenResponse} from "../model/token-response";
import {IMember} from "../model/member";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(protected injector: Injector) {
    super("AccountService", injector);
  }

  login(userOtp: IUserOtp): Promise<IMember> {

    return super.put({path: '/login', body: userOtp});
  }

  getMembers(): Promise<IMember[]> {
    return super.get({path: '/members'});

  }

}
