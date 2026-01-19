import { enmOrganizationType } from "../enum/organization-type.enum";
import { enmRoleAccessType } from "../enum/role-type.enum";

export interface IAuthUser {

  FullName?: string;

  UserName?: string;

  Mail?: string;

  Password?: string;

  PhoneNumber?: string;

  OtpNumber?: string;

  OrganizationDesc?: string;

  StationDesc?: string;

  IsSmsMethod?: boolean;

  OUnit?:enmOrganizationType;

  Policy?:enmRoleAccessType;
}
