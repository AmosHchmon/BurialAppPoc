import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthContextService} from 'src/app/shared/services/auth-context.service';
import {NgOptimizedImage} from '@angular/common';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {constants} from '../../../shared/static/constants';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';

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
    MatIcon,
    FormsModule,
    RouterLink,
    MatTabNav,
    MatTabLink,
    RouterLinkActive,
    MatTabNavPanel,
    MdbFormsModule,
    FloatLabel,
    InputText,
    IconField,
    InputIcon,
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
