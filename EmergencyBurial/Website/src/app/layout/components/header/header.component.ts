import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthContextService} from 'src/app/shared/services/auth-context.service';
import {NgOptimizedImage} from '@angular/common';
import {constants} from '../../../shared/static/constants';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {FormsModule} from "@angular/forms";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {Tab, TabList, Tabs} from "primeng/tabs";

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
    NgOptimizedImage,
    IconField,
    InputIcon,
    FormsModule,
    FloatLabel,
    RouterLink,
    InputText,
    Tabs,
    TabList,
    Tab,
    RouterLinkActive,


  ],
})
export class HeaderComponent implements OnInit {

  searchValue: string;
  tabs: ILink[] = [
    {route: '/dashboard/home', label: 'עמוד הבית', icon: 'pi pi-home'},
    {route: '/dashboard/deceased', label: 'שק חלל', icon: 'pi pi-user'},
    {route: '/dashboard/transport', label: 'שינוע', icon: 'pi pi-truck'},
  ];

  constructor(public authCtx: AuthContextService,
              private router: Router,
  ){
  }

  async ngOnInit(){

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
