import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MessageService} from 'primeng/api';

import {TransportService} from '../../services/transport.service';
import {enmOrganizationType} from 'src/app/shared/enum/organization-type.enum';
import {TransportPurpose} from 'src/app/shared/enum/transport-purpose.enum';
import {CreateTransport} from '../../model/CreateTransport';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {BagSelectItem} from "../../model/BagSelectItem";
import {IListItem} from "../../../../shared/model/list-item";
import {ListService} from "../../../../shared/services/list.service";
import {enmListType} from "../../../../shared/enum/list-type.enum";

@Component({
  selector: 'app-create-transport-dialog',
  templateUrl: './create-transport-dialog.component.html',
  imports: [UiComponentsModule],
  styleUrls: ['./create-transport-dialog.component.scss']
})
export class CreateTransportDialogComponent implements OnInit {

  @Input() visible: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  @ViewChild('transportForm') transportForm!: NgForm;

  availableBags: BagSelectItem[] = [];
  allListItems: IListItem[] = [];

  organizationsList: IListItem[] = [];
  stationsList: IListItem[] = [];
  subStationsList: IListItem[] = [];

  transportData: CreateTransport = this.getEmptyTransport();

  /*organizationTypes = [
    {label: 'תר"ח', value: enmOrganizationType.Tarah},
    {label: 'הכנה לקבורה', value: enmOrganizationType.BurialPreparation},
    {label: 'מכון לרפואה משפטית', value: enmOrganizationType.ForensicInstitute},
  ];
*/
  purposes = [
    {label: 'למכון לרפואה משפטית', value: TransportPurpose.ToForensicInstitute},
    {label: 'לתר"ח', value: TransportPurpose.ToTarah},
    {label: 'למכון הכנה לקבורה', value: TransportPurpose.ToBurialPreparation},
    {label: 'לגוף קבורה', value: TransportPurpose.ToBurialBody}
  ];

  constructor(
    private transportService: TransportService,
    private listService: ListService,
    private messageService: MessageService
  ) {
  }

  async ngOnInit() {

    await this.loadLists();
    await this.loadBags();

    if (!this.transportData.StartDateTime) {
      this.transportData.StartDateTime = new Date();
    }
  }

  private async loadBags() {

    this.availableBags = await this.transportService.availableBags();

    this.availableBags = this.availableBags.map(bag => ({
      ...bag,
      FullLabel: bag.IdentityNumber
        ? ` שק: ${bag.BagNumber} ת'ז: (${bag.IdentityNumber})`
        : bag.BagNumber
    }));
  }

  private async loadLists() {

    this.allListItems = await this.listService.getItemList();

    this.splitLists();
  }

  private splitLists() {

    this.organizationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.OrganizationType);

    this.stationsList = this.allListItems.filter(x => x.ListTypeId == enmListType.StationType);
  }

  private getEmptyTransport(): CreateTransport {

    return {
      BagNumbers: [],
      StartDateTime: new Date(),

      StartLocationType: null,
      StartStationId: null,
      StartLocationNameFreeText: null,

      Purpose: null,
      Destination: null,
      Organization: '',

      VehicleType: '',
      LicensePlate: '',
      DriverFirstName: '',
      DriverLastName: '',
      DriverIdentityNumber: '',
      DriverPhone: ''
    }
  }

  onOrganizationTypeChange() {

    this.subStationsList = this.allListItems.filter(x => x.ListItemDepId == this.transportData.StartLocationType);
  }

  async save() {

    if (this.transportForm.invalid) {

      Object.keys(this.transportForm.controls).forEach(field => {
        const control = this.transportForm.control.get(field);
        control?.markAsTouched();
      });
      return;
    }

    if (this.transportData.BagNumbers.length > 3) {
      this.messageService.add({severity: 'error', summary: 'שגיאה', detail: 'ניתן לבחור עד 3 שקים בלבד'});
      return;
    }

    await this.transportService.createTransport(this.transportData);

    this.messageService.add({severity: 'success', summary: 'הצלחה', detail: 'השינוע נוצר בהצלחה'});
    this.onSaved.emit();
    this.close();

  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);

    this.transportData = this.getEmptyTransport();
    if (this.transportForm) {
      this.transportForm.resetForm();
    }
  }
}
