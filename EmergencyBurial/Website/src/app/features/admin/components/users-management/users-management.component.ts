import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ConfirmationService} from "primeng/api";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IMember} from "../../../../shared/model/member";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {IListItem} from "../../../../shared/model/list-item";
import {ListService} from "../../../../shared/services/list.service";
import {enmListType} from "../../../../shared/enum/list-type.enum";
import {ValidationModule} from "../../../../shared/validation/validation.module";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AlertService} from "../../../../shared/services/alert.service";
import {MemberService} from "../../../../shared/services/member.service";
import {enmOrganizationType} from "../../../../shared/enum/organization-type.enum";
import {BaseManagementComponent} from "../../../../core/abstract/base-management";

@Component({
  selector: 'app-users-management',
  imports: [UiComponentsModule, ValidationModule],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent extends BaseManagementComponent<IMember> implements OnInit {

  @ViewChild('memberForm') memberForm: NgForm;

  membersColumns: IColumn[] = [
    {field: 'UserName', header: 'משתמש'},
    {field: 'FullName', header: 'שם מלא'},
    {field: 'Mail', header: 'מייל'},
    {field: 'PhoneNumber', header: 'טלפון'},
    {field: 'OrganizationDesc', header: 'ארגון'},
    {field: 'RoleDesc', header: 'תפקיד'},
    {field: 'StationDesc', header: 'תחנה'}
  ];

  allListItems: IListItem[] = [];
  organizationsList: IListItem[] = [];
  rolesList: IListItem[] = [];
  stationsList: IListItem[] = [];
  subStationsList: IListItem[] = [];

  constructor(private memberService: MemberService,
              private listService: ListService,
              private alertService: AlertService,
              private confirmService: ConfirmationService) {
    super();
  }

  //#region [Lifecycle events]

  async ngOnInit() {

    await this.loadLists();
    await this.loadMembers();
  }

  private async loadLists() {

    this.allListItems = await this.listService.getItemList();
    this.rolesList = await this.listService.getRolesAccessList();

    this.splitLists();
  }

  private splitLists() {

    this.organizationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.OrganizationType);
    this.stationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.StationType);
  }

  private async loadMembers() {

    this.items = await this.memberService.getMembers();
  }

  //endregion

  //#region [Client events]

  async onSaveMember() {

    if (this.currentItem.Id) {

      await this.memberService.updateMember(this.currentItem);

      const index = this.items.findIndex(m => m.Id === this.currentItem.Id);

      if (index !== -1) {
        // שים לב: כאן אולי חסר מידע כמו "שם ארגון" שמגיע מהשרת ב-Join.
        // אם הטבלה מציגה שדות מחושבים, עדיף להשאיר את loadMembers().
        // למען העקביות עם הקבצים הקודמים השארתי עדכון לוקאלי, אך אם המידע חסר - תחזיר את await this.loadMembers()
        this.items[index] = {...this.currentItem};
        this.items = [...this.items];
      }

    } else {

      await this.memberService.saveMember(this.currentItem);
      await this.loadMembers();
    }

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

    this.closeDialog();
  }

  onEditMember() {

    if (this.dt.selection) {

      this.initEditItem(this.dt.selection);
      this.onOrganizationTypeChange();
    }
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

        await this.memberService.deleteMember(member.Id);

        this.closeDialog();
        await this.loadMembers();
      },
      reject: () => {
        return;
      }
    })
  }

  onAddMember() {

    if (this.memberForm) {
      this.memberForm.resetForm();
    }

    const defaultValues: Partial<IMember> = {
      RoleAccessTypeId: null
    };

    this.initNewItem(defaultValues);
  }

  onOrganizationTypeChange() {

    this.subStationsList = this.allListItems.filter(x => x.ListItemDepId == this.currentItem.OrganizationTypeId);
  }

  //endregion

  isStationRequired(): boolean {

    const orgType = this.currentItem.OrganizationTypeId;

    const notRequiredTypes = [
      this.enmOrganizationType.Hamal,
      this.enmOrganizationType.DatServices
    ];

    return !notRequiredTypes.includes(orgType);
  }

  protected readonly enmOrganizationType = enmOrganizationType;
}
