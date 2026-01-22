import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { TarahService } from "../../services/tarah.service";
import { UiComponentsModule } from "../../../../shared/ui-components/ui-components.module";
import { IColumn } from "../../../../shared/ui-components/model/column";
import { TarahList } from "../../model/TarahList";
import { TarahIntakeDialogComponent } from "../tarah-intake-dialog/tarah-intake-dialog.component";
import { TarahUpdateDialogComponent } from "../tarah-update-dialog/tarah-update-dialog.component";
import { TarahStatusEnum } from "../../../../shared/enum/tarah-status.enum";

@Component({
    selector: 'app-tarah-list',
    templateUrl: './tarah-list.component.html',
    imports: [UiComponentsModule, TarahIntakeDialogComponent, TarahUpdateDialogComponent],
    styleUrls: ['./tarah-list.component.scss']
})
export class TarahListComponent implements OnInit {

    @ViewChild('dt') dt: Table | undefined;

    deceasedList: TarahList[] = [];
    cols: IColumn[] = [
        { field: 'select', header: 'בחירה' },
        { field: 'IdentityNumber', header: 'מספר זהות' },
        { field: 'FullName', header: 'שם מלא' },
        { field: 'FatherName', header: 'שם האב' },
        { field: 'ProcessStatusDesc', header: 'סטטוס תהליך' },
        { field: 'TarahStatusDesc', header: 'סטטוס תר"ח' },
        { field: 'BagNumbersDisplay', header: 'מספרי שק' },
        { field: 'RelatedBagNumbers', header: 'שקים מקושרים' },
    ];
    viewOptions = [
        { label: 'ממתינים לקליטה', value: TarahStatusEnum.Pending },
        { label: 'פעילים בתר"ח', value: TarahStatusEnum.InProgress },
        { label: 'שוחררו מתר"ח', value: TarahStatusEnum.Complete }
    ];

    selectedDeceased: TarahList | null = null;

    viewMode: TarahStatusEnum = TarahStatusEnum.Pending;
    isPendingDialogOpen: boolean = false;
    isUpdateDialogOpen: boolean = false;
    isReleaseAction: boolean = false;
    searchText: string;

    constructor(private tarahService: TarahService) {
    }

    ngOnInit(): void {

        this.loadData();
    }

    async loadData() {

        this.deceasedList = [];

        switch (this.viewMode) {

            case TarahStatusEnum.Pending:
                this.deceasedList = await this.tarahService.getPendingList();
                break;

            case TarahStatusEnum.InProgress:
                this.deceasedList = await this.tarahService.getActiveList();
                break;

            case TarahStatusEnum.Complete:
                this.deceasedList = await this.tarahService.getReleasedList();
                break;
        }
    }

    onViewChange() {

        this.clearSearch();
        this.loadData();
    }

    openIntakeDialog() {

        if (this.selectedDeceased) {
            this.isPendingDialogOpen = true;
        }
    }

    openUpdateDetailsDialog() {

        if (this.selectedDeceased) {

            this.isReleaseAction = false;
            this.isUpdateDialogOpen = true;
        }
    }

    openReleaseDialog() {

        if (this.selectedDeceased) {

            this.isReleaseAction = true;
            this.isUpdateDialogOpen = true;
        }
    }

    async onDialogSaved() {

        this.selectedDeceased = null;
        await this.loadData();
    }

    clearSearch() {

        this.searchText = '';
        this.dt?.filterGlobal(null, 'contains');
    }

    getGlobalFilterFields() {

        return this.cols.map(col => col.field);
    }

    getTarahStatusSeverity(TarahStatus: TarahStatusEnum) {

        switch (TarahStatus) {
            case TarahStatusEnum.Pending:
                return 'warn';

            case TarahStatusEnum.InProgress:
                return 'info';

            case TarahStatusEnum.Complete:
                return 'success';

            default:
                return 'secondary';
        }

    }

    protected readonly TarahStatusEnum = TarahStatusEnum;
}
