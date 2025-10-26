import {INavItem} from '../model/nav-item';
import {enmOrganizationType} from "../enum/organization-type.enum";

export const NavMenuItems: Array<INavItem> = [
  {
    name: "עמוד הבית",
    module: "dashboard",
    url: "/dashboard/home",
    icon: "pi pi-home",
    roles: [enmOrganizationType.All, enmOrganizationType.DatServices]
  },
  {
    name: "שק חלל",
    module: "deceased",
    url: "/dashboard/deceaseds",
    icon: "pi pi-user",
    roles: [enmOrganizationType.All]
  },
  {
    name: "שינוע",
    module: "transport",
    url: "/dashboard/transport",
    icon: "pi pi-truck",
    roles: [enmOrganizationType.All]
  },
  {
    name: "ניהול",
    module: "admin",
    url: "/admin/users",
    icon: "pi pi-cog",
    roles: [enmOrganizationType.DatServices]
  },
]
