import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IMember} from "../../../../shared/model/member";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {AuthService} from "../../../../shared/services/auth.service";
import {IListItem} from "../../../../shared/model/list-item";
import {ListService} from "../../../../shared/services/list.service";
import {enmListType} from "../../../../shared/enum/list-type.enum";
import {Table} from "primeng/table";

@Component({
  selector: 'app-users-management',
  imports: [UiComponentsModule],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent implements OnInit {

  @ViewChild('dt') dt: Table<IMember>;

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
    }, {
      field: 'StationDesc',
      header: 'סוג תחנה'
    }
  ]
  members: IMember[] = [];
  newMember: IMember = {};
  showMemberDialog: boolean = false;
  allListItems: IListItem[] = [];
  organizationsList: IListItem[] = [];
  rolesList: IListItem[] = [];
  stationsList: IListItem[] = [];
  subStationsList: IListItem[] = [];

  constructor(private authService: AuthService,
              private listService: ListService,
              private cd: ChangeDetectorRef) {
  }

  async ngOnInit() {

    await this.loadData();

    // TODO: Remove detectChanges after we solve the zone.js problem
    this.cd.detectChanges();
  }

  private async loadData() {

    this.members = await this.authService.getMembers();

    this.allListItems = await this.listService.getItemList();

    this.rolesList = await this.listService.getRolesAccessList();

    this.splitLists();
  }

  private splitLists() {

    this.organizationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.OrganizationType);

    this.stationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.StationType);

  }

  onAddMember() {

  }

  onEditMember() {

    this.newMember = {...this.dt.selection};
    this.showMemberDialog = true;

  }

  onDeleteMember() {

  }

  onNewMember() {

    this.newMember = {RoleAccessTypeId: null};

    this.showMemberDialog = true;
  }

  onStationTypeChange() {

    this.subStationsList = this.allListItems.filter(x => x.ListTypeId == this.newMember.StationTypeId);
console.log(this.subStationsList);
  }
}
