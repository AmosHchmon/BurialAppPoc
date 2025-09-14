import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {constants} from '../../../shared/static/constants';
import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../shared/services/auth-context.service";

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
export class HeaderComponent implements OnInit {

  searchValue: string;
  tabs: ILink[] = [
    {route: '/dashboard/home', label: 'עמוד הבית', icon: 'pi pi-home'},
    {route: '/dashboard/deceaseds', label: 'שק חלל', icon: 'pi pi-user'},
    {route: '/dashboard/transport', label: 'שינוע', icon: 'pi pi-truck'}
  ];

  constructor(private router: Router, private authCtx: AuthContextService){}

  ngOnInit(){

    if(this.authCtx.isAdmin()){
      this.tabs.push({route: '/management/users', label: 'ניהול', icon: 'pi pi-cog'});
    }
  }

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
