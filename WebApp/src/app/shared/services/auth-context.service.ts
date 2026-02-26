import {Injectable} from "@angular/core";
import { IAuthUser } from "../model/user";
import { enmOrganizationType } from "../enum/organization-type.enum";
import { SessionStorageService} from "ngx-webstorage";


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

  logout() {
    this.session.clear("member");
  }

  isLoggedIn() {
    return !!this.UserRBAC;
  }

  get getUserRole(): enmOrganizationType {
    return this.UserRBAC.OUnit;
  }
}
