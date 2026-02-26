import {enmOrganizationType} from "../enum/organization-type.enum";

export interface INavItem {
  name: string;
  module: string;
  page?: string;
  url: string;
  icon?: string;
  color? :string;
  showInMenu?: boolean;
  roles: enmOrganizationType[];
}
