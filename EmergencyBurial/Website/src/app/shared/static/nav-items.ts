import { INavItem } from '../model/nav-item';


export const NavMenuItems: Array<INavItem> = [
  {
    name: "דיווחי הצעה",
    page: "budget-list",
    module: "report",
    url: "/dashboard/budget-list",
    icon: "add_chart",
    color: 'deepskyblue',
    showInMenu: true,
  },
  {
    name: "דיווחי ביצוע",
    page: "payroll-list",
    module: "payroll",
    url: "/dashboard/payroll-list",
    icon: "post_add",
    color: 'forestgreen',
    showInMenu: true,
  },
]
