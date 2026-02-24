import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {TransportService} from '../../services/transport.service';
import {TransportPurpose} from 'src/app/shared/enum/transport-purpose.enum';
import {CreateTransport} from '../../model/CreateTransport';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {ValidationModule} from "../../../../shared/validation/validation.module";
import {IListItem} from "../../../../shared/model/list-item";
import {enmStationType} from "../../../../shared/enum/station-type.enum";
import {UpdateTransport} from "../../model/UpdateTransport";

type TransportModel = CreateTransport & UpdateTransport;

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

  isEditMode: boolean = false;

  selectableItems: { label: string, value: string }[] = [];

  allListItems: IListItem[] = [];

  startOrganizationList: IListItem[] = [];
  startSubStationsList: IListItem[] = [];

  endOrganizationList: IListItem[];
  endSubStationsList: IListItem[] = [];

  transportData: TransportModel = this.getEmptyTransport();

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

        await this.loadTransportDetails(this.transportId);

      } else {

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

    this.onSourceOrganizationTypeChange();
    this.onDestinationChange();

    if (this.transportData.SourceLocationType === enmStationType.TarahStations) {
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

    this.startOrganizationList = this.allListItems.filter(x =>
      (x.Key === enmStationType.TarahStations || x.Key === enmStationType.BurialPreparation)
    );

    this.endOrganizationList = this.allListItems.filter(x =>
      (x.Key === TransportPurpose.ToBurialPreparation || x.Key === TransportPurpose.ToBurialBody)
    );
  }

  onSourceOrganizationTypeChange() {
    this.startSubStationsList = this.allListItems.filter(x => x.ListItemDepId == this.transportData.SourceLocationType);
  }

  onDestinationChange() {
    this.endSubStationsList = this.allListItems.filter(x => x.ListItemDepId == this.transportData.DestinationLocationType);
  }

  async onStationChange() {

    if (!this.transportData.SourceStationId)
      return;

    if (this.transportData.SourceLocationType === enmStationType.TarahStations) {

      const bags = await this.transportService.getAvailableBags(this.transportData.SourceStationId);

      this.selectableItems = bags.map(b => ({
        label: b.IdentityNumber ? `שק: ${b.BagNumber} (${b.IdentityNumber})` : `שק: ${b.BagNumber}`,
        value: b.BagNumber
      }));

    } else {

      const deceaseds = await this.transportService.getAvailableDeceaseds(this.transportData.SourceStationId);

      this.selectableItems = deceaseds.map(d => ({
        label: d.FullName ? `${d.FullName} (${d.IdentityNumber})` : `חלל (${d.BagNumbersDisplay})`,
        value: d.Id
      }));
    }
  }

  async save() {

    if (this.transportForm.invalid) {
      return;
    }

    if(this.transportData.Id){

      this.transportData.DeceasedIds = [];
      this.transportData.BagNumbers = [];

      const updateTransport = this.transportData as UpdateTransport;

      await this.transportService.updateTransport(updateTransport);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.TransportUpdated});

    }else{

      const newTransport = this.transportData as CreateTransport;

      await this.transportService.createTransport(newTransport);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.TransportCreated});
    }

    this.onSaved.emit();
    this.close();
  }

  private getEmptyTransport(): TransportModel{

    return {
      Id: null,
      BagNumbers: [],
      DeceasedIds: [],
      StartDateTime: new Date(),

      SourceLocationType: null,
      SourceStationId: null,
      DestinationLocationType: null,
      DestinationStationId: null,

      IsComplete: false,
      Organization: '',
      VehicleType: '',
      LicensePlate: '',

      DriverFirstName: '',
      DriverLastName: '',
      DriverIdentityNumber: '',
      DriverPhone: ''
    } as TransportModel;
  }

  close() {

    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.transportData = this.getEmptyTransport();

    if (this.transportForm)
      this.transportForm.resetForm();
  }

  protected readonly enmStationType = enmStationType;
}
