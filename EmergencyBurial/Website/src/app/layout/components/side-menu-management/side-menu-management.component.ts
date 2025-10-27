import {Component, OnInit} from '@angular/core';
import {Ripple} from "primeng/ripple";
import {Router} from "@angular/router";

import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";
import {IMenuItem} from "../../../shared/model/menu-item";

@Component({
  selector: 'app-side-menu-management',
  imports: [UiComponentsModule, Ripple],
  templateUrl: './side-menu-management.component.html',
  styleUrl: './side-menu-management.component.scss'
})
export class SideMenuManageComponent implements OnInit {

  visible: boolean = false;
  menuItems: IMenuItem[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {

    this.menuItems = [
      {
        url: '/admin/users',
        icon: 'pi pi-user-plus',
        name: 'ניהול משתמשים'
      },
      {
        url: '/admin/lists',
        icon: 'pi pi-list',
        name: 'ניהול רשימות'
      },
      {
        url: '/admin/deceaseds',
        icon: 'pi pi-id-card',
        name: 'ניהול שקי חלל'
      }
    ]
  }

  navigate(url: string) {

    this.router.navigate([url]);
  }
}
