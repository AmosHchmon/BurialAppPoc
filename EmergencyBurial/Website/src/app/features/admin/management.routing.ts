import {Routes} from "@angular/router";

import {ListsManagementComponent} from "./components/lists-management/lists-management.component";
import {UsersManagementComponent} from "./components/users-management/users-management.component";
import {DeceasedsManagementComponent} from "./components/deceaseds-management/deceaseds-management.component";
import {EventsManagementComponent} from "./components/events-management/events-management.component";

export const ManagementRouting: Routes = [
  {
    path: 'users',
    component: UsersManagementComponent
  },
  {
    path: 'lists',
    component: ListsManagementComponent
  },
  {
    path: 'deceaseds',
    component: DeceasedsManagementComponent
  },
  {
    path: 'events',
    component: EventsManagementComponent
  }
]

