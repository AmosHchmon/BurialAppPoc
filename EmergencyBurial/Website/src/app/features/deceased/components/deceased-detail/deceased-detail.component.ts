import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
import {BurialCoordination} from "../../model/BurialCoordination";
import {BurialCoordinationFormComponent} from "../burial-coordination-form/burial-coordination-form.component";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {BurialProcessStatus} from "../../model/BurialProcessStatus";
import {BurialProcessFormComponent} from "../burial-process-form/burial-process-form.component";
import {TransportFormComponent} from "../../../transport/components/transport-form/transport-form.component";

@Component({
  selector: 'app-deceased-detail',
  standalone: true,
  imports: [UiComponentsModule, DeceasedStaticFieldsComponent, TransportsTableComponent, BurialCoordinationFormComponent, BurialProcessFormComponent, TransportFormComponent],
  templateUrl: './deceased-detail.component.html',
  styleUrl: './deceased-detail.component.scss'
})
export class DeceasedDetailComponent implements OnInit {

  transports: Transport[] = [];
  deceasedAccordion: DeceasedStaticFields[] = [];
  burialTypes: IOptionItem[];

  deceased: Deceased;
  burialDetailsData: DeceasedStaticFields;
  coordinationData: BurialCoordination;
  burialProcess: BurialProcessStatus;

  activeTab: string = "0";
  isTransportDialogOpen: boolean = false;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private deceasedService: DeceasedService,
    private transportService: TransportService,
    private listService: ListService,
    private alertService: AlertService
  ) {
  }

  async ngOnInit() {

    await this.loadDeceasedData();

    this.burialTypes = await this.listService.getBurialTypeList();
  }

  private async loadDeceasedData() {

    const param = this.route.snapshot.paramMap.get('id');

    this.deceased = await this.deceasedService.getDeceasedById(param);

    this.transports = this.deceased?.Transports ? [...this.deceased.Transports] : [];

    this.coordinationData = {...this.deceased?.BurialCoordination};

    this.burialProcess = {...this.deceased?.BurialProcessStatus};

    this.initializeFields();

  }

  private initializeFields() {

    const deceasedFields: IColumn[] = [
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
    const deceasePanel: DeceasedStaticFields = {
      object: this.deceased,
      title: 'חלל',
      fields: deceasedFields,
      splitIndex: 6,
      trackNumber: 1
    }

    const bagDetailsFields: IColumn[] = [
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
    const bagDetailsPanel: DeceasedStaticFields = {
      object: this.deceased?.BagDetails,
      title: 'פרטי שק החלל',
      fields: bagDetailsFields,
      splitIndex: 6,
      trackNumber: 1
    }

    const burialDetailsFields: IColumn[] = [
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
    ];

    this.burialDetailsData = {
      object: this.deceased?.BurialDetails,
      title: 'פרטי קבורה',
      fields: burialDetailsFields,
      splitIndex: 6,
      trackNumber: 3
    }

    this.deceasedAccordion.push(deceasePanel, bagDetailsPanel);

  }

  async saveBurialCoordination(coordinationData: BurialCoordination) {

    const updatedCoordination = await this.deceasedService.updateBurialCoordination(coordinationData);

    if (updatedCoordination) {
      this.coordinationData = {...updatedCoordination};

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

    }
  }

  async saveBurialProcess(burialProcess: BurialProcessStatus) {

    const updatedBurialProcess: BurialProcessStatus = await this.deceasedService.updateBurialProcess(burialProcess);

    if (updatedBurialProcess) {
      this.burialProcess = {...updatedBurialProcess};

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

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

  onTabChange(newTabValue: any) {

    if (this.isEdit && newTabValue !== this.activeTab) {
      console.log('ניסיון לעבור לטאב אחר במצב עריכה - פעולה נחסמה');

      // Force the UI back to the old tab
      //this.activeTab = this.activeTab;
      return;
    }

    this.activeTab = newTabValue;
    this.isEdit = false;
  }

  setEdit(isEdit: boolean){
    this.isEdit = isEdit
  }
}
