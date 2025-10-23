import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {DeceasedService} from '../../services/deceased.service';
import {IColumn} from "../../../../shared/ui-components/model/column";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../../transport/model/transport";
import {TransportService} from "../../../transport/services/transport.service";
import {Deceased} from "../../model/Deceased";
import {TransportFormComponent} from "../../../transport/components/transport-form/transport-form.component";
import {DeceasedAccordion} from "../../model/DeceasedAccordion";
import {DeceasedAccordionContentComponent} from "../deceased-accordion-content/deceased-accordion-content.component";
import {TransportsTableComponent} from "../../../transport/components/transports-table/transports-table.component";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";
import {ListService} from "../../../../shared/services/list.service";
import {IOptionItem} from "../../../../shared/model/list-item";

@Component({
  selector: 'app-deceased-detail',
  standalone: true,
  imports: [UiComponentsModule, TransportFormComponent, DeceasedAccordionContentComponent, TransportsTableComponent, ConvertTimezoneDirective],
  templateUrl: './deceased-detail.component.html',
  styleUrl: './deceased-detail.component.scss'
})
export class DeceasedDetailComponent implements OnInit {

  deceased: Deceased;
  transports: Transport[] = [];
  deceasedAccordion: DeceasedAccordion[] = [];
  burialTypes: IOptionItem[];
  burialBody: IOptionItem[];

  activeTab: string = "0";
  activeAccordionIndex: number[];

  constructor(
    private route: ActivatedRoute,
    private deceasedService: DeceasedService,
    private transportService: TransportService,
    private listService: ListService
  ) {
  }

  ngOnInit() {

    this.loadDeceasedData();

  }

  private async loadDeceasedData(): Promise<void> {

    const param = this.route.snapshot.paramMap.get('id');

    this.deceased = await this.deceasedService.getDeceasedById(param);
    this.burialBody = await this.listService.getBurialBodyList();
    this.burialTypes = await this.listService.getBurialTypeList();

    this.deceased.BagDetails.FullName = this.deceased?.FirstName + ' ' + this.deceased?.LastName;
    this.deceased.BagDetails.IdentityNumber = this.deceased?.IdentityNumber;

    this.transports = this.deceased.Transports;

    this.initializeFields();

  }

  private initializeFields(): void {

    const bagDetailsFields: IColumn[] = [
      {field: 'FullName', header: 'חלל'},
      {field: 'IdentityNumber', header: 'מספר תעודת זהות'},
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
      {field: 'BroughtFrom', header: 'המיקום ממנו הובא השק'}
    ]
    const bagDetailsPanel: DeceasedAccordion = {
      object: this.deceased?.BagDetails,
      title: 'פרטי שק חלל',
      fields: bagDetailsFields,
      splitIndex: 7,
      trackNumber: 1
    }

    const operationalDetailsFields: IColumn[] = [
      {field: 'IdentificationStatus', header: 'סטטוס זיהוי'},
      {field: 'BadMessageProcessStatus', header: 'סטטוס תהליך הודעה מרה'},
      {field: 'CollectionStatus', header: 'סטטוס איסוף'},
      {field: 'BadMessageStartDate', header: 'תאריך אישור תחילת הודעה מרה'},
      {field: 'BurialProcessStatus', header: 'סטטוס תהליך קבורה'}
    ];
    const operationalDetailsPanel: DeceasedAccordion = {
      object: this.deceased?.OperationalDetails,
      title: 'פרטים תפעוליים',
      fields: operationalDetailsFields,
      splitIndex: 3,
      trackNumber: 2
    }

    const burialDetailsFields: IColumn[] = [
      {field: 'BurialType', header: 'סוג קבורה'},
      {field: 'IsCivilBurial', header: 'האם קבורה אזרחית'},
      {field: 'BurialLicenseScanned', header: 'רישיון קבורה סרוק'},
      {field: 'TaharahStatus', header: 'סטטוס טהרה'},
      {field: 'TaharahLocation', header: 'מקום טהרה'},
      {field: 'CoffinType', header: 'סוג ארון'},
      {field: 'TaharahReceptionDate', header: 'תאריך קליטה לטהרה'}
    ];
    const burialDetailsPanel: DeceasedAccordion = {
      object: this.deceased?.BurialDetails,
      title: 'פרטי קבורה',
      fields: burialDetailsFields,
      splitIndex: 4,
      trackNumber: 3
    }

    const burialCoordinationFields: IColumn[] = [
      {field: 'SocialWorkerName', header: 'שם עובד סוציאלי/ת'},
      {field: 'SocialWorkerPhone', header: 'טלפון עובד סוציאלי/ת'},
      {field: 'BadMessageDeliveredDateTime', header: 'תאריך מסירת הודעה מרה'},
      {field: 'FamilyContactName', header: 'בן משפחה'},
      {field: 'FamilyContactPhone', header: 'טלפון בן משפחה'},
    ]
    const burialCoordinationPanel: DeceasedAccordion = {
      object: this.deceased?.BurialCoordination,
      title: 'פרטי הודעה מרה',
      fields: burialCoordinationFields,
      splitIndex: 3,
      trackNumber: 4
    }

    this.deceasedAccordion.push(bagDetailsPanel, operationalDetailsPanel, burialDetailsPanel, burialCoordinationPanel);
  }

  switchToTransportTab() {
    this.activeTab = "1";
  }

  async loadTransports(deceasedId: string) {

    this.transports = await this.transportService.getTransportsByDeceasedId(deceasedId?.toLocaleString());
  }

  async handleTransportCreated() {

    if (this.deceased) {
      await this.loadTransports(this.deceased.Id);
    }

    this.activeAccordionIndex = [2];

    this.activeTab = "0";

  }

  saveBurialDetails() {

  }

  saveBurialCoordination() {

  }
}
