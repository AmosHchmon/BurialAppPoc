import {enmMemberType} from '../enum/list-type.enum';

export interface IMember {
  Id?: string;
  UserName?: string;
  FullName?: string;
  Mail?: string;
  PhoneNumber?: string;
  MemberTypeId?: enmMemberType;
  IsActive?: boolean;
  MemberTypeDescription?: string;
}
