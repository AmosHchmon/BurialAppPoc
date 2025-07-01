import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthContextService } from 'src/app/shared/services/auth-context.service';
import {IMember} from '../../../shared/model/member';
import {constants} from '../../../shared/static/constants';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [],
} )
export class HeaderComponent implements OnInit {

  isOpen: boolean = true;
  public member: IMember = {};

  constructor( public authCtx: AuthContextService,
               private router: Router
  ) {}

  async ngOnInit() {
  }

  onToggleMenu() {
    this.isOpen = !this.isOpen;
  }

  signOut() {
    this.authCtx.Token = null;
    this.router.navigate( [ 'sessions/login' ] );
  }

  protected readonly constants = constants;
}
