import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService} from "primeng/api";
import {Subscription} from "rxjs";

import {DeceasedService} from '../../services/deceased.service';
import {IColumn} from "../../../../shared/ui-components/model/column";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../../transport/model/transport";
import {TransportService} from "../../../transport/services/transport.service";
import {Deceased} from "../../model/Deceased";
import {DeceasedStaticFields} from "../../model/DeceasedStaticFields";
import {ListService} from "../../../../shared/services/list.service";
import {IOptionItem} from "../../../../shared/model/list-item";
import {DeceasedStaticFieldsComponent} from "../deceased-static-fields/deceased-static-fields.component";
import {TransportsTableComponent} from "../../../transport/components/transports-table/transports-table.component";
import {BurialCoordinationFormComponent} from "../burial-coordination-form/burial-coordination-form.component";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {BurialProcessFormComponent} from "../burial-process-form/burial-process-form.component";
import {TabItem, tabItems} from "../../../../shared/static/tabs-items";
import {bagDetailsFields, burialDetailsFields, deceasedFields} from "../../../../shared/static/deceased-forms-fields";
import {SignalRService} from "../../../../shared/services/signalR.service";
import {DeceasedBag} from "../../model/DeceasedBag";

@Component({
  selector: 'app-deceased-detail',
  standalone: true,
  imports: [UiComponentsModule, DeceasedStaticFieldsComponent, TransportsTableComponent, BurialCoordinationFormComponent, BurialProcessFormComponent],
  templateUrl: './deceased-detail.component.html',
  styleUrl: './deceased-detail.component.scss'
})
export class DeceasedDetailComponent implements OnInit, OnDestroy {

  @ViewChild(BurialCoordinationFormComponent) burialCoordinationForm: BurialCoordinationFormComponent;
  @ViewChild(BurialProcessFormComponent) burialProcessForm: BurialProcessFormComponent;

  private updateSubscription: Subscription;

  tabItems: TabItem[] = tabItems;
  deceasedFields: IColumn[] = deceasedFields;
  bagDetailsFields: IColumn[] = bagDetailsFields;
  burialDetailsFields: IColumn[] = burialDetailsFields;

  burialTypes: IOptionItem[];
  transports: Transport[] = [];
  deceasedAccordion: DeceasedStaticFields[] = [];

  deceased: Deceased;
  selectedBag: DeceasedBag;
  burialDetailsData: DeceasedStaticFields;

  param: string = "";
  activeTab: string = "0";
  isEdit: boolean = false;
  isTransportDialogOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private deceasedService: DeceasedService,
    private transportService: TransportService,
    private listService: ListService,
    private alertService: AlertService,
    private confirmService: ConfirmationService,
    private signalRService: SignalRService
  ) {
  }

  //#region [Lifecycle events]

  async ngOnInit() {

    this.param = this.route.snapshot.paramMap.get('id');

    await this.loadDataForTab(this.activeTab);

    this.burialTypes = await this.listService.getBurialTypeList();

    this.listenToRealTimeUpdates();

  }

  private initializePanels() {

    this.deceasedAccordion = [];

    const deceasedPanel: DeceasedStaticFields = {
      object: this.deceased,
      title: 'חלל',
      fields: this.deceasedFields,
      splitIndex: 6,
      trackNumber: 1
    }

    const bagDetailsPanel: DeceasedStaticFields = {
      object: this.selectedBag,
      title: 'פרטי שק ' + this.selectedBag.BagNumber,
      fields: this.bagDetailsFields,
      splitIndex: 6,
      trackNumber: 1
    }

    this.deceasedAccordion.push(deceasedPanel, bagDetailsPanel);

  }

  private async loadDataForTab(tabValue: string) {

    switch (tabValue) {
      case "0":

        if (!this.deceased) {
          this.deceased = await this.deceasedService.getDeceasedById(this.param);

          if (this.deceased.DeceasedBags && this.deceased.DeceasedBags.length > 0) {
            this.onSelectBag(this.deceased.DeceasedBags[0]);
          }
        }
        break;

      case "1":

        const burialDetails = await this.deceasedService.getBurialDetails(this.param);

        this.burialDetailsData = {
          object: burialDetails,
          title: 'פרטי קבורה',
          fields: this.burialDetailsFields,
          splitIndex: 6,
          trackNumber: 3
        };
        break;
    }
  }

  private restoreCurrentForm() {

    switch (this.activeTab) {
      case "2":
        this.burialCoordinationForm?.restoreOriginalData();
        break;
      case "3":
        this.burialProcessForm?.restoreOriginalData();
        break;
    }

  }

  ngOnDestroy(): void {

    this.unSubscribeToHubEvents();

  }

  //endregion

  //#region [Realtime events]

  private listenToRealTimeUpdates() {

    this.updateSubscription = this.signalRService.updatedDeceased.subscribe(async (updatedDeceased: Deceased) => {

      // בדיקה שהחלל שמעודכן הוא החלל שמוצג על המסך
      if (updatedDeceased.Id === this.deceased?.Id) {

        this.deceased = {...this.deceased, ...updatedDeceased};

        this.initializePanels();

        this.alertService.alert(AlertType.Info, {ClientMessage: DialogMessage.DeceasedUpdated});
      }
    });
  }

  unSubscribeToHubEvents() {

    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }

  }

  //endregion

  //#region [Client events]

  onSelectBag(bag: DeceasedBag) {

    if (!bag) {
      return;
    }

    this.selectedBag = bag;
    this.initializePanels();

    this.transports = bag.Transports || [];

  }

  openTransportDialog(isOpen: boolean) {
    this.isTransportDialogOpen = isOpen;
  }

  async onTabChange(newTabValue: any) {

    const currentTab = this.tabItems.find(item => item.value === this.activeTab);
    const currentTabHeader = currentTab?.header ?? "";

    if (this.isEdit) {

      this.confirmService.confirm({
        icon: 'pi pi-exclamation-triangle',
        message: DialogMessage.EditModeInTab + currentTabHeader,
        closable: false,
        acceptLabel: 'הבנתי',
        rejectVisible: false,
        accept: async () => await this.handleTabAccept(newTabValue)
      });

      return;
    }
    this.activeTab = newTabValue;
    await this.loadDataForTab(newTabValue); // קריאה לטעינה בעת החלפת טאב
    //await this.switchTab(newTabValue);
  }

  setEdit(isEdit: boolean) {
    this.isEdit = isEdit
  }

  private async handleTabAccept(newTabValue: any) {

    this.restoreCurrentForm();

    this.isEdit = false;

    await this.switchTab(newTabValue);
  }

  private async switchTab(newTabValue: any) {

    await this.loadDataForTab(newTabValue);

    this.activeTab = newTabValue;
    this.isEdit = false;
  }

  //endregion
}
