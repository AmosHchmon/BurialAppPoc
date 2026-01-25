import {enmOrganizationType} from "../enum/organization-type.enum";
import {enmRoleAccessType} from "../enum/role-type.enum";

export interface IMember {

  Id?: string;

  UserName?: string;

  FullName?: string;

  Mail?: string;

  PhoneNumber?: string;

  Password?: string;

  OrganizationTypeId?: enmOrganizationType;

  RoleAccessTypeId?: enmRoleAccessType;

  OrganizationDesc?: string;

  RoleDesc?: string,

  StationDesc?: string,

  StationId?: number,

  OtpNumber?: string,

  OtpExpired?: Date,

  IsActive?: boolean;
}
