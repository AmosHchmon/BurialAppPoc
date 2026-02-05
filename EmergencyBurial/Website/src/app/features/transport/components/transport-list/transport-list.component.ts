import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Table} from "primeng/table";

import {TransportList} from '../../model/TransportList';
import {TransportService} from '../../services/transport.service';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {CreateTransportDialogComponent} from "../create-transport-dialog/create-transport-dialog.component";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {TransportPurpose} from "../../../../shared/enum/transport-purpose.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  imports: [UiComponentsModule, CreateTransportDialogComponent],
  styleUrls: ['./transport-list.component.scss']
})
export class TransportListComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  allTransports: TransportList[] = [];
  filteredTransports: TransportList[] = [];

  selectedView: TransportPurpose | null = null;
  selectedTransport: TransportList | null = null;
  searchText: string = '';
  isCreateDialogOpen: boolean = false;

  transportId: number | null = null;

  cols: IColumn[] = [
    {field: 'select', header: 'בחירה'},
    {field: 'StartDateTime', header: 'תאריך שינוע'},
    {field: 'StartLocation', header: 'מקום יציאה'},
    {field: 'PurposeDesc', header: 'תכלית'},
    {field: 'IsCompleted', header: 'סטטוס'},
    {field: 'BagNumbers', header: 'שקים בשינוע'}
  ];

  filterOptions = [
    {label: 'כל השינועים', value: null},
    {label: 'מכון לרפואה משפטית', value: TransportPurpose.ToForensicInstitute},
    {label: 'הכנה לקבורה', value: TransportPurpose.ToBurialPreparation},
    {label: 'גוף קבורה', value: TransportPurpose.ToBurialBody}
  ];

  constructor(
    private transportService: TransportService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {

    this.allTransports = await this.transportService.getTransports();

    this.filterByPurpose(this.selectedView);
  }

  onFilterChange(event: any) {
    this.filterByPurpose(event.value);

    this.selectedTransport = null;
  }

  filterByPurpose(purpose: TransportPurpose | null) {

    if (purpose === null) {
      this.filteredTransports = [...this.allTransports];
    } else {
      this.filteredTransports = this.allTransports.filter(t => t.Purpose === purpose);
    }
  }

  onCreateTransport() {
    this.transportId = null;
    this.isCreateDialogOpen = true;
  }

  onViewDetails() {
    if (this.selectedTransport) {
      this.transportId = this.selectedTransport.Id;
      this.isCreateDialogOpen = true;
    }
  }

  onTransportSaved() {
    this.isCreateDialogOpen = false;
    this.transportId = null;
    this.loadData();
  }

  onEndTransport() {

    if (!this.selectedTransport)
      return;

    this.confirmationService.confirm({
      message: DialogMessage.ShouldEndTransport,
      header: DialogMessage.EndTransport,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'כן',
      rejectLabel: 'ביטול',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-text',

      accept: async () => {

        await this.transportService.endTransport(this.selectedTransport!.Id);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.TransportEnded});

        this.selectedTransport = null;

        this.loadData();
      }
    });
  }

  getGlobalFilterFields(): string[] {
    return this.cols.map(col => col.field);
  }
}
