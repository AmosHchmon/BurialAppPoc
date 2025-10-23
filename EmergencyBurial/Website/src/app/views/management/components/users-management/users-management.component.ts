import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {NgForm} from "@angular/forms";
import {ConfirmationService} from "primeng/api";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IMember} from "../../../../shared/model/member";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {AuthService} from "../../../../shared/services/auth.service";
import {IListItem} from "../../../../shared/model/list-item";
import {ListService} from "../../../../shared/services/list.service";
import {enmListType} from "../../../../shared/enum/list-type.enum";
import {ValidationModule} from "../../../../shared/validation/validation.module";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
  selector: 'app-users-management',
  imports: [UiComponentsModule, ValidationModule],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent implements OnInit {

  @ViewChild('dt') dt: Table<IMember>;
  @ViewChild('memberForm') memberForm: NgForm;

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
              private alertService: AlertService,
              private confirmService: ConfirmationService) {
  }

  async ngOnInit() {

    await this.loadLists();
    await this.loadMembers();

  }

  private async loadLists() {

    this.allListItems = await this.listService.getItemList();

    this.rolesList = await this.listService.getRolesAccessList();

    this.splitLists();
  }

  private async loadMembers() {

    this.members = await this.authService.getMembers();

  }

  private splitLists() {

    this.organizationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.OrganizationType);

    this.stationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.StationType);

  }

  async onSaveMember() {

    if (this.newMember.Id) {
      await this.authService.updateMember(this.newMember);
    } else {
      await this.authService.saveMember(this.newMember);
    }

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

    this.showMemberDialog = false;

    this.dt.selection = null;

    this.memberForm.resetForm();

    await this.loadMembers();
  }

  onEditMember() {

    this.newMember = {...this.dt.selection};
    this.showMemberDialog = true;

  }

  async onDeleteMember() {

    this.confirmService.confirm({
      header: DialogMessage.DeleteListItem,
      message: DialogMessage.ConfirmQuestion,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: async () => {

        const member = this.dt.selection;

        await this.authService.deleteMember(member.Id);

        this.showMemberDialog = false;

        this.dt.selection = null;

        await this.loadMembers();
      },
      reject: () => {
        return;
      }

    })
  }

  onAddMember() {

    this.newMember = {RoleAccessTypeId: null};

    this.showMemberDialog = true;
  }

  onStationTypeChange() {

    this.subStationsList = this.allListItems.filter(x => x.ListItemDepId == this.newMember.StationTypeId);

  }

}
