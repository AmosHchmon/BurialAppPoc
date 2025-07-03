import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthContextService} from 'src/app/shared/services/auth-context.service';
import {NgOptimizedImage} from '@angular/common';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {constants} from '../../../shared/static/constants';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

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
  ],
})
export class HeaderComponent implements OnInit {

  public searchValue: string;

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

  protected readonly constants = constants;

  applyFilter(value: any){

  }

  clearSearchField(){
    this.searchValue = null;
  }
}
