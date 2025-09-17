import {enmStationType} from "../enum/station-type.enum";
import {enmOrganizationType} from "../enum/organization-type.enum";
import {enmRoleType} from "../enum/role-type.enum";

export interface IMember {
  Id?: string;

  UserName?: string;

  FullName?: string;

  Mail?: string;

  PhoneNumber?: string;

  OrganizationTypeId?: enmOrganizationType;

  RoleTypeId?: enmRoleType;

  StationTypeId?: enmStationType;

  OrganizationDesc?: string;

  RoleDesc?: string,

  StationDesc?: string,

  StationId?: number,

  OtpNumber?: string,

  OtpExpired?: Date,

  IsActive?: boolean;
}
