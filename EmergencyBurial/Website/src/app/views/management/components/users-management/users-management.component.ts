import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IMember} from "../../../../shared/model/member";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-users-management',
  imports: [UiComponentsModule],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent implements OnInit {

  membersColumns: IColumn[] = [
    {
      field: 'UserName',
      header: 'משתמש'
    },
    {
      field: 'FullName',
      header: 'שם מלא'
    },
    {
      field: 'Mail',
      header: 'מייל'
    },
    {
      field: 'PhoneNumber',
      header: 'טלפון'
    },
    {
      field: 'OrganizationDesc',
      header: 'סוג ארגון'
    },
    {
      field: 'RoleDesc',
      header: 'סוג תפקיד'
    },{
      field: 'StationDesc',
      header: 'סוג תחנה'
    }
  ]
  members: IMember[];

  constructor(private authService: AuthService, private cd: ChangeDetectorRef) {
  }

  async ngOnInit() {

    await this.loadData();

    // remove detectChanges later (it doesnt work without it for now)
    this.cd.detectChanges();
  }

  private async loadData(){

    this.members = await this.authService.getMembers();
  }

  onNewMember() {

  }

  onEditMember() {

  }

  onDeleteMember() {

  }
}
