import {INavItem} from '../model/nav-item';
import {enmOrganizationType} from "../enum/organization-type.enum";

export const NavMenuItems: Array<INavItem> = [
  {
    name: "עמוד הבית",
    module: "dashboard",
    url: "/dashboard/home",
    icon: "pi pi-home",
    roles: [enmOrganizationType.All]
  },
  {
    name: "שק חלל",
    module: "deceased",
    url: "/dashboard/deceaseds",
    icon: "pi pi-user",
    roles: [enmOrganizationType.Tarah, enmOrganizationType.Hamal]
  },
  {
    name: "שינוע",
    module: "transport",
    url: "/dashboard/transport",
    icon: "pi pi-truck",
    roles: [enmOrganizationType.All]
  },
  {
    name: "הכנה לקבורה",
    module: "taharah",
    url: "/dashboard/taharah",
    icon: "pi pi-users",
    roles: [enmOrganizationType.BurialPreparation, enmOrganizationType.Hamal]
  },
  {
    name: "ניהול",
    module: "admin",
    url: "/admin/users",
    icon: "pi pi-cog",
    roles: [enmOrganizationType.Hamal]
  },
]
