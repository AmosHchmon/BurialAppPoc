import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthContextService } from 'src/app/shared/services/auth-context.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ProfileDialogComponent
} from '../../../views/dashboard/components/dialog/profile-dialog/profile-dialog.component';
import {IMember} from '../../../shared/model/member';
import {AccountService} from '../../../shared/services/account.service';
import {constants} from '../../../shared/static/constants';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
} )
export class HeaderComponent implements OnInit {

  isOpen: boolean = true;
  public officials: IMember[] = [];
  @Input() isShowMenu: boolean = true;
  public member: IMember = {};

  constructor( public authCtx: AuthContextService,
               private accountService: AccountService,
               private router: Router,
               public dialog: MatDialog ) {
  }

  async ngOnInit() {

    this.officials = await this.accountService.getMemberCouncils();

    this.officials = [...new Set(this.officials)];

    this.member = await this.accountService.getMember();

  }

  onToggleMenu() {
    this.isOpen = !this.isOpen;
  }

  signOut() {
    this.authCtx.Token = null;
    this.router.navigate( [ 'sessions/login' ] );
  }

  openProfile() {

    const dialogRef = this.dialog.open( ProfileDialogComponent, {
      disableClose: true,
      width: '30%',
      height: 'fit-content'
    });
  }

  changeCouncil(){
    this.router.navigate( [ '/sessions/select' ] );
  }

  protected readonly constants = constants;
}
