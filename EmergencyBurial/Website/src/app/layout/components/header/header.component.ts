import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {constants} from '../../../shared/static/constants';
import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";

interface ILink {
  route: string,
  label: string,
  icon: string
}

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
export class HeaderComponent{

  searchValue: string;
  tabs: ILink[] = [
    {route: '/dashboard/home', label: 'עמוד הבית', icon: 'pi pi-home'},
    {route: '/dashboard/deceaseds', label: 'שק חלל', icon: 'pi pi-user'},
    {route: '/dashboard/transport', label: 'שינוע', icon: 'pi pi-truck'},
    {route: '/management', label: 'ניהול', icon: 'pi pi-cog'},
  ];

  constructor(private router: Router){}

  signOut(){

    this.router.navigate(['/login']);
  }

  applyFilter(value: any){

  }

  clearSearchField(){
    this.searchValue = null;
  }

  protected readonly constants = constants;

}
