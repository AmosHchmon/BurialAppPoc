import {Injectable, Injector} from '@angular/core';
import {BaseService} from "../../core/abstract/base-service";
import {IAuthUser} from "../model/user";
import {IMember} from "../model/member";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(protected injector: Injector) {
    super("AccountService", injector);
  }

  login(userOtp: IAuthUser): Promise<IAuthUser> {

    return super.put({path: '/login', body: userOtp});
  }

  loginWithPassword(userOtp: IAuthUser): Promise<any>{
    return super.put({path: '/login-with-password', body: userOtp});
  }

  createOtp( userOtp: IAuthUser ): Promise<any> {

    return super.put( { path: '/otp', body: userOtp } );

  }

  logout(): Promise<void> {

    return super.post({path: '/logout'});
  }

  getMembers(): Promise<IMember[]> {

    return super.get<IMember[]>({path: '/members'});
  }

  saveMember(member: IMember): Promise<IMember> {

    return super.post({body: member});

  }

  updateMember(member: IMember): Promise<IMember> {

    return super.put({body: member});

  }

  deleteMember(id: number): Promise<IMember> {

    return super.delete({path: `/${id}`});

  }

}
