import {Routes} from "@angular/router";
import {TaharahListComponent} from "./components/taharah-list/taharah-list.component";
import {TaharahDetailsComponent} from "./components/taharah-details/taharah-details.component";

export const BurialRouting: Routes = [
  {
    path: '', component: TaharahListComponent
  },
  {
    path: 'details/:id', component: TaharahDetailsComponent
  }
]
