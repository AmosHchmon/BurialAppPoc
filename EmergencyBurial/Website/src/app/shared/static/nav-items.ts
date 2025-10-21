import { INavItem } from '../model/nav-item';


export const NavMenuItems: Array<INavItem> = [
  {
    name: "עמוד הבית",
    module: "dashboard",
    url: "/dashboard/home",
    icon: "pi pi-home",
  },
  {
    name: "שק חלל",
    module: "deceased",
    url: "/dashboard/deceaseds",
    icon: "pi pi-user",
  },
  {
    name: "שינוע",
    module: "transport",
    url: "/dashboard/transport",
    icon: "pi pi-truck",
  },
]
