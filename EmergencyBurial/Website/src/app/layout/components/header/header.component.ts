import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthContextService} from 'src/app/shared/services/auth-context.service';
import {NgOptimizedImage} from '@angular/common';
import {MatTab, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {constants} from '../../../shared/static/constants';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

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
    MatTabGroup,
    MatTab,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatIconButton,
    FormsModule,
    MatSuffix,
    RouterLink,
    MatTabNav,
    MatTabLink,
    RouterLinkActive,
    MatTabNavPanel,
    RouterOutlet,
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
