import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthContextService} from 'src/app/shared/services/auth-context.service';
import {NgOptimizedImage} from '@angular/common';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {constants} from '../../../shared/static/constants';
import {FloatLabel} from 'primeng/floatlabel';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {InputText} from 'primeng/inputtext';

interface ILink {
  label: string,
  path: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTabNav,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    MatTabNavPanel,
    IconField,
    FloatLabel,
    InputIcon,
    FormsModule,
    MatIcon,
    InputText,
  ],
})
export class HeaderComponent implements OnInit {

  searchValue: string;
  links: ILink[] = [
    {label: 'עמוד הבית', path: '/home'},
    {label: 'שק חלל', path: '/deceased'},
    {label: 'שינוע', path: '/transport'},
  ];

  constructor(public authCtx: AuthContextService,
              private router: Router,
  ){
  }

  async ngOnInit(){
  }

  signOut(){
    this.authCtx.Token = null;
    this.router.navigate(['sessions/login']);
  }

  applyFilter(value: any){

  }

  clearSearchField(){
    this.searchValue = null;
  }

  protected readonly constants = constants;
}
