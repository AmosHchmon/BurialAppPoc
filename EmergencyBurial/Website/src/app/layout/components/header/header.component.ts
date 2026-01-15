import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {constants} from '../../../shared/static/constants';
import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../shared/services/auth-context.service";
import {INavItem} from "../../../shared/model/nav-item";
import {NavMenuItems} from "../../../shared/static/nav-items";
import {enmOrganizationType} from "../../../shared/enum/organization-type.enum";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {AuthService} from "../../../shared/services/auth.service";

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
  userMenuItems: MenuItem[] | undefined;

  constructor(private router: Router,
              private authService: AuthService,
              private authCtx: AuthContextService) {
  }

  ngOnInit() {

    const userRole = this.authCtx.getUserRole;

    this.tabs = NavMenuItems.filter(item => {

      const isPublic = item.roles.includes(enmOrganizationType.All);

      const hasSpecificRole = item.roles.includes(userRole);

      return isPublic || hasSpecificRole;
    })

    this.userMenuItems = [
      {
        label: 'פרופיל אישי',
        icon: 'pi pi-user-edit',
        command() {
        }
      },
      {
        label: 'התנתק',
        icon: 'pi pi-sign-out',
        command: () => {
          this.signOut();
        }
      }
    ];
  }

  async signOut() {

    await this.authService.logout();

    this.router.navigate(['/login']);

  }

  applyFilter(value: any) {

  }

  clearSearchField() {
    this.searchValue = null;
  }

  protected readonly constants = constants;

}
