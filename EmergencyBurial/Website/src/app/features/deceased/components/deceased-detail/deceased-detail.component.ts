import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService} from "primeng/api";

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
import {DeceasedBurialCoordination} from "../../model/DeceasedBurialCoordination";
import {BurialCoordinationFormComponent} from "../burial-coordination-form/burial-coordination-form.component";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {DeceasedBurialProcessStatus} from "../../model/DeceasedBurialProcessStatus";
import {BurialProcessFormComponent} from "../burial-process-form/burial-process-form.component";
import {TransportFormComponent} from "../../../transport/components/transport-form/transport-form.component";

interface TabItem {
  value: string;
  header: string;
}

@Component({
  selector: 'app-deceased-detail',
  standalone: true,
  imports: [UiComponentsModule, DeceasedStaticFieldsComponent, TransportsTableComponent, BurialCoordinationFormComponent, BurialProcessFormComponent, TransportFormComponent],
  templateUrl: './deceased-detail.component.html',
  styleUrl: './deceased-detail.component.scss'
})
export class DeceasedDetailComponent implements OnInit {

  @ViewChild(BurialCoordinationFormComponent) burialCoordinationForm: BurialCoordinationFormComponent;
  @ViewChild(BurialProcessFormComponent) burialProcessForm: BurialProcessFormComponent;

  transports: Transport[] = [];
  deceasedAccordion: DeceasedStaticFields[] = [];
  burialTypes: IOptionItem[];
  tabItems: TabItem[] = [
    {value: "0", header: "פרטים"},
    {value: "1", header: "פרטי קבורה"},
    {value: "2", header: "תיאום קבורה"},
    {value: "3", header: "סטטוס תהליך קבורה"},
    {value: "4", header: "שינועים"},
  ];
  deceasedFields: IColumn[] = [
    {field: 'HalalNumber', header: 'מספר חלל'},
    {field: 'IdentityNumber', header: 'מספר זהות'},
    {field: 'FirstName', header: 'שם פרטי'},
    {field: 'LastName', header: 'שם משפחה'},
    {field: 'FatherName', header: 'שם האב'},
    {field: 'Gender', header: 'מין'},
    {field: 'Nationality', header: 'לאום'},
    {field: 'HomeCity', header: 'עיר מגורים'},
    {field: 'PeleNumber', header: 'מספר פל"א'},
    {field: 'HomeAddress', header: 'כתובת מגורים'},
    {field: 'Notes', header: 'הערות כלליות'},
    {field: 'CreatedOn', header: 'נוצר בתאריך'}
  ]
  bagDetailsFields: IColumn[] = [
    {field: 'Affiliation', header: 'ארגון שיוך'},
    {field: 'ReceivingStation', header: 'תחנת קליטה'},
    {field: 'LastKnownLocation', header: 'מיקום אחרון'},
    {field: 'PartDescription', header: 'תיאור חלק'},
    {field: 'RelatedBagNumbers', header: 'מספר שקים מקושרים'},
    {field: 'CanBeIdentifiedByAcquaintance', header: 'האם ניתן לזהות בהיכרות אישית'},
    {field: 'ReceivingNotes', header: 'הערות שנרשמו בעת הקליטה בתר"ח'},
    {field: 'FillerName', header: 'שם ממלא טופס הקליטה'},
    {field: 'ArrivalDateTime', header: 'תאריך ושעת ההגעה'},
    {field: 'BroughtBy', header: 'הגורם שהביא את השק'},
    {field: 'BroughtFrom', header: 'המיקום ממנו הובא השק'},
    {field: 'ObjectsOnDeceased', header: 'פרטים שנמצאו על החלל'}
  ]
  burialDetailsFields: IColumn[] = [
    {field: 'BurialType', header: 'סוג קבורה'},
    {field: 'IsCivilBurial', header: 'האם קבורה אזרחית'},
    {field: 'BurialLicenseNumber', header: 'מספר רישיון קבורה'},
    {field: 'BurialLicenseScanned', header: 'רישיון קבורה סרוק'},
    {field: 'TaharahStatus', header: 'סטטוס טהרה'},
    {field: 'TaharahLocation', header: 'מקום טהרה'},
    {field: 'InCoffin', header: 'האם נקבר בארון'},
    {field: 'BodyConditionNotes', header: 'הערות על מצב הגופה'},
    {field: 'Block', header: 'גוש'},
    {field: 'Plot', header: 'חלקה'},
    {field: 'Row', header: 'שורה'},
    {field: 'Grave', header: 'קבר'}
  ]

  deceased: Deceased;
  burialDetailsData: DeceasedStaticFields;
  coordinationData: DeceasedBurialCoordination;
  burialProcess: DeceasedBurialProcessStatus;

  activeTab: string = "0";
  isTransportDialogOpen: boolean = false;
  isEdit: boolean = false;
  param: string = "";

  constructor(
    private route: ActivatedRoute,
    private deceasedService: DeceasedService,
    private transportService: TransportService,
    private listService: ListService,
    private alertService: AlertService,
    private confirmService: ConfirmationService
  ) {
  }

  async ngOnInit() {

    this.param = this.route.snapshot.paramMap.get('id');

    await this.loadDataForTab("0");

    this.burialTypes = await this.listService.getBurialTypeList();

  }

  private async loadDataForTab(tabValue: string) {

    switch (tabValue) {
      case "0":

        this.deceased = await this.deceasedService.getDeceasedById(this.param);
        this.initializePanels();
        break;

      case "1":

        const burialDetails = await this.deceasedService.getBurialDetails(this.param);
        this.burialDetailsData = {
          object: burialDetails,
          title: 'פרטי קבורה',
          fields: this.burialDetailsFields,
          splitIndex: 6,
          trackNumber: 3
        }
        break;

      case "2":

        const coordination = await this.deceasedService.getDeceasedBurialCoordination(this.param);
        this.coordinationData = {...coordination};
        break;

      case "3":

        const burialProcess = await this.deceasedService.getDeceasedBurialProcessStatus(this.param);
        this.burialProcess = {...burialProcess};
        break;

      case "4":

        const transports = await this.transportService.getTransportsByDeceasedId(this.param);
        this.transports = transports ? [...transports] : [];
        break;
    }

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
      object: this.deceased?.DeceasedBagDetails,
      title: 'פרטי שק החלל',
      fields: this.bagDetailsFields,
      splitIndex: 6,
      trackNumber: 1
    }

    this.deceasedAccordion.push(deceasedPanel, bagDetailsPanel);

  }

  async saveBurialCoordination(coordinationData: DeceasedBurialCoordination) {

    const updatedCoordination = await this.deceasedService.updateBurialCoordination(coordinationData);

    if (updatedCoordination) {
      this.coordinationData = {...updatedCoordination};

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

      this.isEdit = false;
    }
  }

  async saveBurialProcess(burialProcess: DeceasedBurialProcessStatus) {

    const updatedBurialProcess: DeceasedBurialProcessStatus = await this.deceasedService.updateBurialProcess(burialProcess);

    if (updatedBurialProcess) {
      this.burialProcess = {...updatedBurialProcess};

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

      this.isEdit = false;
    }
  }

  openTransportDialog(isOpen: boolean) {
    this.isTransportDialogOpen = isOpen;
  }

  async saveTransport(newTransport: Transport) {

    newTransport.DeceasedId = this.deceased.Id;

    const transport = await this.transportService.createTransport(newTransport);

    this.transports.push(transport);

    this.isTransportDialogOpen = false;

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

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

    await this.switchTab(newTabValue);
  }

  private async handleTabAccept(newTabValue: any) {

    this.restoreCurrentForm();

    this.isEdit = false;

    await this.switchTab(newTabValue);
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

  private async switchTab(newTabValue: any) {

    await this.loadDataForTab(newTabValue);

    this.activeTab = newTabValue;
    this.isEdit = false;
  }

  setEdit(isEdit: boolean) {
    this.isEdit = isEdit
  }
}
