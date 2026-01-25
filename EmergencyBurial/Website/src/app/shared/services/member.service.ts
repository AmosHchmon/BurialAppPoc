import {Injectable, Injector} from '@angular/core';
import {BaseService} from "../../core/abstract/base-service";
import {IMember} from "../model/member";
import {IAuthUser} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {

  constructor(protected injector: Injector) {
    super("MemberService", injector);
  }

  getMember(): Promise<IMember>{

    return super.get<IMember>({path: '/member'});
  }

  getMembers(): Promise<IMember[]> {

    return super.get<IMember[]>({path: '/'});
  }

  saveMember(member: IMember): Promise<IMember> {

    return super.post({body: member});
  }

  updateMember(user: IMember): Promise<IMember> {

    return super.put({body: user});
  }

  deleteMember(id: number): Promise<IMember> {

    return super.delete({path: `/${id}`});
  }
}
