import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthContextService } from 'src/app/shared/services/auth-context.service';
import { MatDialog } from '@angular/material/dialog';
import {IMember} from '../../../shared/model/member';
import {constants} from '../../../shared/static/constants';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
} )
export class HeaderComponent implements OnInit {

  isOpen: boolean = true;
  public officials: IMember[] = [];
  public member: IMember = {};

  constructor( public authCtx: AuthContextService,
               private router: Router,
               public dialog: MatDialog ) {
  }

  async ngOnInit() {


  }

  onToggleMenu() {
    this.isOpen = !this.isOpen;
  }

  signOut() {
    this.authCtx.Token = null;
    this.router.navigate( [ 'sessions/login' ] );
  }


  changeCouncil(){
    this.router.navigate( [ '/sessions/select' ] );
  }

  protected readonly constants = constants;
}
