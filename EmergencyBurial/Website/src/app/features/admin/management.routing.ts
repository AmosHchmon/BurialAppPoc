import {Routes} from "@angular/router";

import {ListsManagementComponent} from "./components/lists-management/lists-management.component";
import {UsersManagementComponent} from "./components/users-management/users-management.component";

export const ManagementRouting: Routes = [
  {
    path: 'users',
    component: UsersManagementComponent
  },
  {
    path: 'lists',
    component: ListsManagementComponent
  }
]
