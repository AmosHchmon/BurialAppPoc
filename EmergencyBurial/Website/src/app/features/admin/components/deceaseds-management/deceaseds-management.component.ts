import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {AdminDeceasedService} from "../../services/admin-deceased.service";
import {BaseManagementComponent} from "../../../../core/abstract/base-management";

@Component({
  selector: 'app-deceaseds-management',
  imports: [UiComponentsModule, ValidationModule],
  templateUrl: './deceaseds-management.component.html',
  styleUrl: './deceaseds-management.component.scss'
})
export class DeceasedsManagementComponent extends BaseManagementComponent<Deceased> implements OnInit, OnDestroy {

  @ViewChild('deceasedForm') deceasedForm: NgForm;

  cols: IColumn[] = [
    {field: 'IdentityNumber', header: 'מספר זהות'},
    {field: 'FullName', header: 'שם מלא'},
    {field: 'FatherName', header: 'שם האב'},
  ];

  selectedExistingDeceased: Deceased;
  activeTab: number = 0;
  isIdentified: boolean = true;

  private deceasedSubscription: Subscription | undefined;

  constructor(private adminDeceasedService: AdminDeceasedService,
              private alertService: AlertService,
              private signalRService: SignalRService,
              private confirmService: ConfirmationService) {
    super();
  }

  //#region [Lifecycle events]
  async ngOnInit() {
    await this.loadDeceased();
    this.subscribeToHubEvents();
  }

  private async loadDeceased() {
    this.items = await this.adminDeceasedService.getDeceaseds();
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

        this.items.unshift(newDeceased);
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

    this.isIdentified = true;
    this.selectedExistingDeceased = null;

    this.initNewItem({});
  }

  async onSaveDeceased() {

    if (this.currentItem.Id) {

      await this.adminDeceasedService.updateDeceased(this.currentItem);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemUpdateSuccessfully});

      const index = this.items.findIndex(d => d.Id === this.currentItem.Id);

      if (index !== -1) {
        this.items[index] = {...this.currentItem};
        this.items = [...this.items];
      }

    } else {

      const createdDeceased = await this.adminDeceasedService.saveDeceased(this.currentItem);

      if (createdDeceased) {
        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});
        this.items = [createdDeceased, ...this.items];
      }
    }

    this.closeDialog();
    this.activeTab = 0;
  }

  onEditDeceased() {

    if (!this.dt.selection)
      return;

    if (this.dt.selection.IdentityNumber && this.dt.selection.IdentityNumber.length > 0) {
      this.isIdentified = true;
    }

    this.initEditItem(this.dt.selection);
  }

  onDeleteDeceased() {

    this.confirmService.confirm({
      header: DialogMessage.ArchiveDeceased,
      message: DialogMessage.ConfirmQuestion,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: async () => {

        const deceased = this.dt.selection;

        await this.adminDeceasedService.deleteDeceased(deceased.Id);

        this.closeDialog();

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

  removeBag(index: number) {

    if (this.currentItem.DeceasedBags) {
      this.currentItem.DeceasedBags.splice(index, 1);
    }
  }

  addBag() {

    const newBag: DeceasedBag = {
      DeceasedId: this.currentItem.Id,
      PartDescription: ''
    };

    if (!this.currentItem.DeceasedBags) {
      this.currentItem.DeceasedBags = [];
    }

    this.currentItem.DeceasedBags.push(newBag);
  }

  onCancelDialog() {

    this.closeDialog();
    this.activeTab = 0;
  }

  //endregion
}
