import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {constants} from '../../../shared/static/constants';
import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../shared/services/auth-context.service";
import {INavItem} from "../../../shared/model/nav-item";
import {NavMenuItems} from "../../../shared/static/nav-items";
import {enmOrganizationType} from "../../../shared/enum/organization-type.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    UiComponentsModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class HeaderComponent implements OnInit {

  searchValue: string;
  tabs: INavItem[] = NavMenuItems;

  constructor(private router: Router, private authCtx: AuthContextService) {
  }

  ngOnInit() {

    const userRole = this.authCtx.getUserRole;

    this.tabs = NavMenuItems.filter(item => {

      const isPublic = item.roles.includes(enmOrganizationType.All);

      const hasSpecificRole = item.roles.includes(userRole);

      return isPublic || hasSpecificRole;
    })

  }

  signOut() {

    this.router.navigate(['/login']);
  }

  applyFilter(value: any) {

  }

  clearSearchField() {
    this.searchValue = null;
  }

  protected readonly constants = constants;

}
