import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Deceased} from '../../model/Deceased';
import {DeceasedService} from '../../services/deceased.service';
import {IColumn} from "../../../../shared/ui-components/model/column";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../../transport/model/transport";
import {TransportService} from "../../../transport/services/transport.service";
import {TabsModule} from "primeng/tabs";
import {TransportFormComponent} from "../../../transport/components/transport-form/transport-form.component";

@Component({
    selector: 'app-deceased-detail',
    standalone: true,
    imports: [UiComponentsModule, TabsModule, TransportFormComponent],
    templateUrl: './deceased-detail.component.html',
    styleUrl: './deceased-detail.component.scss'
})
export class DeceasedDetailComponent implements OnInit {

    deceased: Deceased | null = null;
    fieldsPart1: IColumn[] = [];
    fieldsPart2: IColumn[] = [];
    transportCols: IColumn[] = [];
    transports: Transport[] = [];
    activeTab: string = "0";
    activeAccordionIndex: number[] | null = null;

    constructor(
        private route: ActivatedRoute,
        private deceasedService: DeceasedService,
        private transportService: TransportService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.loadDeceasedData();
    }

    private async loadDeceasedData(): Promise<void> {

        const param = this.route.snapshot.paramMap.get('id');

        const id = parseInt(param);

        this.deceased = await this.deceasedService.getDeceasedById(id);

        this.transports = await this.transportService.getTransportsByDeceasedId(id);

        this.initializeFields();

    }

    private initializeFields(): void {

        const allFields = [
            {field: 'HalalNumber', header: 'מספר חלל'},
            {field: 'IdentityNumber', header: 'מספר זהות'},
            {field: 'FirstName', header: 'שם פרטי'},
            {field: 'LastName', header: 'שם משפחה'},
            {field: 'FatherName', header: 'שם האב'},
            {field: 'Gender', header: 'מין'},
            {field: 'Nationality', header: 'לאום'},
            {field: 'HomeCity', header: 'עיר מגורים'},
            {field: 'HomeAddress', header: 'כתובת'},
            {field: 'CurrentStatusId', header: 'סטטוס'},
            {field: 'CurrentLocationId', header: 'מיקום'},
            {field: 'BurialCity', header: 'עיר קבורה'},
            {field: 'IsLinkedToOtherCasesValue', header: 'מקושר למקרים'},
            {field: 'IsCivilBurialValue', header: 'קבורה אזרחית'},
            {field: 'Notes', header: 'הערות'}
        ];

        const splitIndex = 7;

        this.fieldsPart1 = allFields.slice(0, splitIndex);
        this.fieldsPart2 = allFields.slice(splitIndex);

        this.transportCols = [
            {field: 'Id', header: 'מזהה שינוע'},
            {field: 'FirstName', header: 'שם החלל'},
            {field: 'StartLocation', header: 'מקום התחלת שינוע'},
            {field: 'StartDateTime', header: 'מועד התחלת שינוע'}
        ];
    }

    switchToTransportTab() {
        this.activeTab = "1";
    }

    async loadTransports(deceasedId: number) {

        this.transports = await this.transportService.getTransportsByDeceasedId(deceasedId);
    }

    handleTransportCreated() {

        if (this.deceased) {
            this.loadTransports(this.deceased.Id);
        }

        this.activeAccordionIndex = [2];

        this.activeTab = "0";

        setTimeout(() => {
            this.cdr.detectChanges();
        }, 100)

    }
}
