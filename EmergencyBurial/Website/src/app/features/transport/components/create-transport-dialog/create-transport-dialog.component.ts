import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {TransportService} from '../../services/transport.service';
import {enmOrganizationType} from 'src/app/shared/enum/organization-type.enum';
import {TransportPurpose} from 'src/app/shared/enum/transport-purpose.enum';
import {CreateTransport} from '../../model/CreateTransport';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";

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

  filteredBags: string[] = [];

  transportData: CreateTransport = this.getEmptyTransport();

  // נתונים ל-Dropdowns
  organizationTypes = [
    {label: 'תר"ח', value: enmOrganizationType.Tarah},
    {label: 'הכנה לקבורה', value: enmOrganizationType.BurialPreparation},
    {label: 'גוף קבורה', value: enmOrganizationType.BetAlmin},
  ];

  purposes = [
    {label: 'למכון לרפואה משפטית', value: TransportPurpose.ToForensicInstitute},
    {label: 'לתר"ח', value: TransportPurpose.ToTarah},
    {label: 'למכון הכנה לקבורה', value: TransportPurpose.ToBurialPreparation},
    {label: 'לגוף קבורה', value: TransportPurpose.ToBurialBody}
  ];

  constructor(
    private transportService: TransportService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  // פונקציית עזר לאתחול
  private getEmptyTransport(): CreateTransport {
    return {
      StartLocationType: null as any, // יחייב בחירה
      StartLocationNameFreeText: '',
      Purpose: null as any,
      Destination: '',
      Organization: '',
      VehicleType: '',
      LicensePlate: '',
      DriverDetails: '',
      BagNumbers: []
    };
  }

  async searchBags(event: any) {

    const query = event.query;

    this.filteredBags = await this.transportService.searchAvailableBags(query);
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
