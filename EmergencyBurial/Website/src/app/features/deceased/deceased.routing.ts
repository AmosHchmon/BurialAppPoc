import {Routes} from "@angular/router";
import {DeceasedsListComponent} from "./components/deceaseds-list/deceaseds-list.component";
import {DeceasedDetailComponent} from "./components/deceased-detail/deceased-detail.component";

export const DeceasedRouting: Routes = [
  {
    path: '',
    component: DeceasedsListComponent
  },
  {
    path: ':id',
    component: DeceasedDetailComponent
  }
]
