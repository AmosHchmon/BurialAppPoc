import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {TransportService} from '../../services/transport.service';
import {TransportPurpose} from 'src/app/shared/enum/transport-purpose.enum';
import {CreateTransport} from '../../model/CreateTransport';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {enmListType} from "../../../../shared/enum/list-type.enum";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {ValidationModule} from "../../../../shared/validation/validation.module";
import {IListItem} from "../../../../shared/model/list-item";
import {enmStationType} from "../../../../shared/enum/station-type.enum";

@Component({
  selector: 'app-create-transport-dialog',
  templateUrl: './create-transport-dialog.component.html',
  standalone: true,
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

  selectableItems: any[] = [];

  allListItems: IListItem[] = [];
  stationsList: IListItem[] = [];
  startSubStationsList: IListItem[] = [];
  endSubStationsList: IListItem[] = [];

  transportData: CreateTransport = this.getEmptyTransport();

  purposes = [
    {label: 'הכנה לקבורה', value: enmStationType.BurialPreparation},
    {label: 'גוף קבורה', value: enmStationType.BetAlmin}
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
        this.selectableItems = [];
      }
    }
  }

  private async loadTransportDetails(id: number) {

    const data = await this.transportService.getTransportById(id);

    if (data.StartDateTime) {
      data.StartDateTime = new Date(data.StartDateTime);
    }
    this.transportData = data;

    this.onOrganizationTypeChange();

    if (this.transportData.StartLocationType === enmStationType.TarahStations) {
      this.selectableItems = this.transportData.BagNumbers.map(b => ({
        label: `שק: ${b}`,
        value: b
      }));
    } else {
      this.selectableItems = this.transportData.DeceasedIds.map(d => ({
        label: `חלל (מזהה: ${d})`,
        value: d
      }));
    }
  }

  private async loadLists() {

    this.allListItems = await this.listService.getItemList();

    this.stationsList = this.allListItems.filter(x =>
      x.ListTypeId == enmListType.StationType &&
      (x.Key === enmStationType.TarahStations || x.Key === enmStationType.BurialPreparation)
    );
  }

  onOrganizationTypeChange() {

    this.startSubStationsList = this.allListItems.filter(x => x.ListItemDepId == this.transportData.StartLocationType);

    this.transportData.StartStationId = null;
    this.selectableItems = [];
    this.transportData.BagNumbers = [];
    this.transportData.DeceasedIds = [];
  }

  onPurposeChange() {

    this.endSubStationsList = this.allListItems.filter(x => x.ListItemDepId == this.transportData.Purpose);
  debugger
  }

  async onStationChange() {

    this.transportData.BagNumbers = [];
    this.transportData.DeceasedIds = [];
    this.selectableItems = [];

    if (!this.transportData.StartStationId)
      return;

    if (this.transportData.StartLocationType === enmStationType.TarahStations) {

      const bags = await this.transportService.getAvailableBags(this.transportData.StartStationId);

      this.selectableItems = bags.map(b => ({
        label: b.IdentityNumber ? `שק: ${b.BagNumber} (${b.IdentityNumber})` : `שק: ${b.BagNumber}`,
        value: b.BagNumber
      }));

    } else {

      const deceaseds = await this.transportService.getAvailableDeceaseds(this.transportData.StartStationId);

      this.selectableItems = deceaseds.map(d => ({
        label: d.FullName ? `${d.FullName} (${d.IdentityNumber})` : `חלל (${d.BagNumbersDisplay})`,
        value: d.Id
      }));
    }
  }

  async save() {

    if (this.transportData.StartLocationType === enmStationType.BurialPreparation) {

      this.transportData.DeceasedIds = [];
    } else {

      this.transportData.BagNumbers = [];
    }

    if (this.transportForm.invalid)
      return;

    await this.transportService.createTransport(this.transportData);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.TransportCreated});

    this.onSaved.emit();
    this.close();
  }

  private getEmptyTransport(): CreateTransport {

    return {
      BagNumbers: [],
      DeceasedIds: [],
      StartDateTime: new Date(),

      StartLocationType: null,
      StartStationId: null,
      Purpose: null,

      Destination: null,
      Organization: '',
      VehicleType: '',
      LicensePlate: '',

      DriverFirstName: '',
      DriverLastName: '',
      DriverIdentityNumber: '',
      DriverPhone: ''
    };
  }

  close() {

    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.transportData = this.getEmptyTransport();

    if (this.transportForm)
      this.transportForm.resetForm();
  }

  enableEdit() {

  }

  protected readonly enmStationType = enmStationType;
}
