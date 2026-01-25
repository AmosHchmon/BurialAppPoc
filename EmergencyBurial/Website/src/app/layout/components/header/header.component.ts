import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItem} from "primeng/api";

import {constants} from '../../../shared/static/constants';
import {UiComponentsModule} from "../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../shared/services/auth-context.service";
import {INavItem} from "../../../shared/model/nav-item";
import {NavMenuItems} from "../../../shared/static/nav-items";
import {enmOrganizationType} from "../../../shared/enum/organization-type.enum";
import {AuthService} from "../../../shared/services/auth.service";
import {IMember} from "../../../shared/model/member";
import {MemberService} from "../../../shared/services/member.service";
import {AlertService} from "../../../shared/services/alert.service";
import {AlertType} from "../../../core/enums/alert.enum";
import {DialogMessage} from "../../../shared/static/messages";
import {UserProfileComponent} from "../user-profile/user-profile.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    UiComponentsModule,
    RouterLink,
    RouterLinkActive,
    UserProfileComponent
  ],
})
export class HeaderComponent implements OnInit {

  tabs: INavItem[] = NavMenuItems;
  userMenuItems: MenuItem[] | undefined;
  showProfileDialog: boolean = false;
  isEditMode: boolean = false;
  profileData: IMember = {};

  private originalProfileData: string;

  constructor(private router: Router,
              private authService: AuthService,
              private alertService: AlertService,
              private memberService: MemberService,
              public authCtx: AuthContextService) {
  }

  ngOnInit() {

    const userRole = this.authCtx.getUserRole;

    this.tabs = NavMenuItems.filter(item => {

      const isPublic = item.roles.includes(enmOrganizationType.All);

      const hasSpecificRole = item.roles.includes(userRole);

      return isPublic || hasSpecificRole;
    })

    this.userMenuItems = [
      {
        label: 'פרופיל אישי',
        icon: 'pi pi-user-edit',
        command: async () => {
          await this.openProfileDialog();
        }
      },
      {
        label: 'התנתק',
        icon: 'pi pi-sign-out',
        command: async () => {
          await this.signOut();
        }
      }
    ];
  }

  async signOut() {

    await this.authService.logout();

    this.router.navigate(['/login']);
  }

  async openProfileDialog() {

    this.isEditMode = false;

    this.profileData = await this.memberService.getMember();

    this.originalProfileData = JSON.stringify(this.profileData);

    this.showProfileDialog = true;
  }

  async saveProfile() {

    const updatedProfile = await this.memberService.updateMember(this.profileData);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.MemberUpdated});

    this.profileData = {...updatedProfile};

    this.isEditMode = false;
  }

  cancelEdit() {

    this.profileData = JSON.parse(this.originalProfileData);

    this.isEditMode = false;
  }

  protected readonly constants = constants;
}
