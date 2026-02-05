import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {TransportService} from '../../services/transport.service';
import {TransportPurpose} from 'src/app/shared/enum/transport-purpose.enum';
import {CreateTransport} from '../../model/CreateTransport';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {BagSelectItem} from "../../model/BagSelectItem";
import {IListItem} from "../../../../shared/model/list-item";
import {ListService} from "../../../../shared/services/list.service";
import {enmListType} from "../../../../shared/enum/list-type.enum";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {ValidationModule} from "../../../../shared/validation/validation.module";
import {UpdateTransport} from "../../model/UpdateTransport";

@Component({
  selector: 'app-create-transport-dialog',
  templateUrl: './create-transport-dialog.component.html',
  imports: [UiComponentsModule, ValidationModule],
  styleUrls: ['./create-transport-dialog.component.scss']
})
export class CreateTransportDialogComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() transportId: number | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  @ViewChild('transportForm') transportForm!: NgForm;

  isViewMode: boolean = false;
  isEditMode: boolean = false;

  availableBags: BagSelectItem[] = [];

  allListItems: IListItem[] = [];
  stationsList: IListItem[] = [];
  subStationsList: IListItem[] = [];

  transportData: CreateTransport = this.getEmptyTransport();

  purposes = [
    {label: 'למכון לרפואה משפטית', value: TransportPurpose.ToForensicInstitute},
    {label: 'לתר"ח', value: TransportPurpose.ToTarah},
    {label: 'למכון הכנה לקבורה', value: TransportPurpose.ToBurialPreparation},
    {label: 'לגוף קבורה', value: TransportPurpose.ToBurialBody}
  ];

  constructor(
    private transportService: TransportService,
    private listService: ListService,
    private alertService: AlertService
  ) {
  }

  async ngOnInit() {

    await this.loadLists();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue === true) {


      this.isEditMode = false;

      if (this.transportId) {

        this.isViewMode = true;
        await this.loadTransportDetails(this.transportId);

      } else {

        this.isViewMode = false;
        this.isEditMode = true;
        this.transportData = this.getEmptyTransport();

        await this.loadBags();

        if (!this.transportData.StartDateTime) {
          this.transportData.StartDateTime = new Date();
        }
      }
    }
  }

  private async loadTransportDetails(id: number) {

    const data = await this.transportService.getTransportById(id);

    if (data.StartDateTime) {
      data.StartDateTime = new Date(data.StartDateTime);
    }

    this.transportData = data;

    this.availableBags = data.BagNumbers.map(b => ({BagNumber: b, FullLabel: b} as any));

    this.onOrganizationTypeChange();
  }

  private async loadBags() {

    this.availableBags = await this.transportService.availableBags();

    this.availableBags = this.availableBags.map(bag => ({
      ...bag,
      FullLabel: bag.IdentityNumber
        ? ` שק: ${bag.BagNumber} ת'ז: (${bag.IdentityNumber})`
        : ` שק: ${bag.BagNumber} - לא מזוהה`,
    }));
  }

  private async loadLists() {

    this.allListItems = await this.listService.getItemList();

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

    if (this.transportId) {

      const updateDto: UpdateTransport = {
        Id: this.transportId,
        ...this.transportData
      };

      await this.transportService.updateTransport(updateDto);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemUpdateSuccessfully});
    } else {

      await this.transportService.createTransport(this.transportData);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.TransportCreated});
    }

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

  enableEdit() {
    this.isEditMode = true;
  }
}
