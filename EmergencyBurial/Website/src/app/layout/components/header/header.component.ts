import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {constants} from '../../../shared/static/constants';
import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../shared/services/auth-context.service";
import {INavItem} from "../../../shared/model/nav-item";
import {NavMenuItems} from "../../../shared/static/nav-items";

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

    //Todo: Treat it when implementing permissions on the menu
    if (this.authCtx.isAdmin()) {

      const managementTabUrl = '/management/users';

      const tabExists = this.tabs.some(tab => tab.url === managementTabUrl);

      if (!tabExists) {
        this.tabs.push({url: managementTabUrl, module: 'management', name: 'ניהול', icon: 'pi pi-cog'});
      }

    }
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
