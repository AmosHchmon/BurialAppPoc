import {Injectable, Injector} from '@angular/core';
import {BaseService} from "../../core/abstract/base-service";
import {IUserOtp} from "../model/user-otp";
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

    return super.get<IMember[]>({path: '/members'});
  }

  saveMember(member: IMember): Promise<IMember> {

    return super.post({body: member});

  }

  updateMember(member: IMember): Promise<IMember> {

    return super.put({body: member});

  }

  deleteMember(id: number): Promise<IMember> {

    return super.delete({path: `${id}`});

  }

}
