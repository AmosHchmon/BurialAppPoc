import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {ConfirmationService} from "primeng/api";

import {Deceased} from "../../../deceased/model/Deceased";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {AlertService} from "../../../../shared/services/alert.service";
import {SignalRService} from "../../../../shared/services/signalR.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {ValidationModule} from "../../../../shared/validation/validation.module";
import {DeceasedBag} from "../../../deceased/model/DeceasedBag";
import {ManageService} from "../../services/manage.service";

@Component({
  selector: 'app-deceaseds-management',
  imports: [UiComponentsModule, ValidationModule],
  templateUrl: './deceaseds-management.component.html',
  styleUrl: './deceaseds-management.component.scss'
})
export class DeceasedsManagementComponent implements OnInit, OnDestroy {

  @ViewChild('dt') dt: Table<Deceased>;
  @ViewChild('deceasedForm') deceasedForm: NgForm;

  cols: IColumn[] = [
    {field: 'IdentityNumber', header: 'מספר זהות'},
    {field: 'FullName', header: 'שם מלא'},
    {field: 'FatherName', header: 'שם האב'},
  ];
  deceasedList: Deceased[] = [];
  newDeceased: Deceased = {};
  selectedExistingDeceased: Deceased;
  searchText: string;
  activeTab: number = 0;

  isIdentified: boolean = true;
  showDeceasedDialog: boolean = false;
  isEdit: boolean = false;

  private deceasedSubscription: Subscription | undefined;

  constructor(private manageService: ManageService,
              private alertService: AlertService,
              private signalRService: SignalRService,
              private confirmService: ConfirmationService) {

  }

  //#region [Lifecycle events]
  async ngOnInit() {

    await this.loadDeceased();

    this.subscribeToHubEvents();
  }

  private async loadDeceased() {

    this.deceasedList = await this.manageService.getDeceaseds();
  }

  ngOnDestroy(): void {

    this.unSubscribeToHubEvents();

  }

  //endregion

  //#region [Realtime]
  unSubscribeToHubEvents() {

    if (this.deceasedSubscription) {
      this.deceasedSubscription.unsubscribe();
    }

  }

  private subscribeToHubEvents(): void {

    this.deceasedSubscription = this.signalRService.newDeceased.subscribe(
      (newDeceased: Deceased) => {

        this.deceasedList.unshift(newDeceased);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.NewDeceasedAdded});
      }
    );
  }

  //endregion

  //#region [Client events]
  onAddDeceased() {

    const defaultValues = {
      isIdentified: true,
      isFullBody: true
    };

    if (this.deceasedForm) {
      this.deceasedForm.resetForm(defaultValues);
    }

    this.isEdit = false;
    this.isIdentified = true;

    this.newDeceased = {};
    this.selectedExistingDeceased = null;

    this.showDeceasedDialog = true;
  }

  async onSaveDeceased() {

    if (this.newDeceased.Id) {

      await this.manageService.updateDeceased(this.newDeceased);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemUpdateSuccessfully});

      const index = this.deceasedList.findIndex(d => d.Id === this.newDeceased.Id);

      if (index !== -1) {

        this.deceasedList[index] = {...this.newDeceased};
        this.deceasedList = [...this.deceasedList];
      }

    } else {

      const createdDeceased = await this.manageService.saveDeceased(this.newDeceased);

      if (createdDeceased) {
        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

        this.deceasedList = [createdDeceased, ...this.deceasedList];
      }

    }

    this.newDeceased = {};
    this.dt.selection = null;

    this.showDeceasedDialog = false;
  }

  onEditDeceased() {

    if (this.dt.selection.IdentityNumber.length > 0) {
      this.isIdentified = true;
    }

    this.newDeceased = structuredClone(this.dt.selection);
    this.isEdit = true;
    this.showDeceasedDialog = true;
  }

  onDeleteDeceased() {

    this.confirmService.confirm({
      header: DialogMessage.DeleteListItem,
      message: DialogMessage.ConfirmQuestion,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: async () => {

        const deceased = this.dt.selection;

        await this.manageService.deleteDeceased(deceased.Id);

        this.showDeceasedDialog = false;

        this.dt.selection = null;

        await this.loadDeceased();
      },
      reject: () => {
        return;
      }

    })

  }

  getGlobalFilterFields(): string[] {

    return this.cols.map(col => col.field);
  }

  clearSearch() {

    this.searchText = '';

    if (this.dt) {
      this.dt.filterGlobal(null, 'contains');
    }
  }

  removeBag(index: number) {
    this.newDeceased.DeceasedBags.splice(index, 1);
  }

  addBag() {

    const newBag: DeceasedBag = {
      DeceasedId: this.newDeceased.Id,
      PartDescription: ''
    };

    if (!this.newDeceased.DeceasedBags) {
      this.newDeceased.DeceasedBags = [];
    }

    this.newDeceased.DeceasedBags.push(newBag);
  }

  onCancelDialog() {

    this.showDeceasedDialog = false;
    this.activeTab = 0;
    this.newDeceased = {};
  }

  //endregion
}
