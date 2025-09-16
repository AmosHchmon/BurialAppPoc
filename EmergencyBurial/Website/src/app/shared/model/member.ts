import {enmOrganizationType, enmRoleType} from '../enum/list-type.enum';

export interface IMember {
  Id?: string;
  UserName?: string;
  FullName?: string;
  Mail?: string;
  PhoneNumber?: string;
  OrganizationDesc?: string;
  RoleDesc?: string,
  StationDesc?: string,
  StationId?: number,
  OtpNumber?: string,
  OtpExpired?: Date,
  IsActive?: boolean;
  MemberTypeDescription?: string;
}
