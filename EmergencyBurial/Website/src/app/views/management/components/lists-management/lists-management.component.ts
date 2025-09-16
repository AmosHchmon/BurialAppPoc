import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {NgForm} from "@angular/forms";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IListType} from "../../../../shared/model/list-type";
import {ListService} from "../../../../shared/services/list.service";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {IListItem} from "../../../../shared/model/list-item";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-list-side-menu-management',
    imports: [UiComponentsModule],
    templateUrl: './lists-management.component.html',
    styleUrl: './lists-management.component.scss'
})
export class ListsManagementComponent implements OnInit {

    @ViewChild('typeTable') typeTable!: Table;
    @ViewChild('listTable') listTable!: Table;

    @ViewChild('typeForm') typeForm: NgForm;
    @ViewChild('listForm') listForm: NgForm;

    listTypes: IListType[] = [];
    allListItems: IListItem[] = [];
    currentListItems: IListItem[] = [];
    listTypesColumns: IColumn[] = [
        {
            field: 'Id',
            header: 'מזהה'
        },
        {
            field: 'Text',
            header: 'תיאור'
        },
        {
            field: 'IsValid',
            header: 'פעיל'
        }

    ];
    listItemsColumns: IColumn[] = [
        {
            field: 'Id',
            header: 'מזהה'
        },
        {
            field: 'ListItemDepId',
            header: 'קישור לפריט'
        },
        {
            field: 'Text',
            header: 'תיאור'
        },
        {
            field: 'Description',
            header: 'הסבר'
        }
    ];
    showListTypeDialog: boolean = false;
    showListItemDialog: boolean = false;
    newListType: IListType = {};
    newListItem: IListItem = {};
    selectedType: number;

    constructor(private listService: ListService,
                private alertService: AlertService,
                private confirmService: ConfirmationService) {
    }

    async ngOnInit() {

        await this.loadListTypes();
        await this.loadListItems();
    }

    private async afterCloseDialog() {

        this.showListTypeDialog = false;
        this.showListItemDialog = false;

        this.newListType = {};
        this.newListItem = {};

        this.typeTable.selection = null
        this.listTable.selection = null

        await this.loadListTypes();
        await this.loadListItems();
    }

    //#region [ListType methods]

    private async loadListTypes() {

        this.listTypes = await this.listService.getTypeList();

        this.selectedType = this.selectedType ?? this.listTypes.at(0).Id;
    }

    onNewListType() {

        this.typeForm.resetForm();
        this.showListTypeDialog = true;
        this.newListType = {};

    }

    async onDeleteListType() {

        const haveConnectedItems = this.allListItems
            .filter(x => x.ListTypeId == this.typeTable.selection?.Id).length > 0;

        if (haveConnectedItems) {
            this.alertService.alert(AlertType.Warning, {ClientMessage: DialogMessage.ConnectedListItems});
            return;
        }

        this.confirmService.confirm({
            header: DialogMessage.DeleteListType,
            message: DialogMessage.ConfirmQuestion,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'כן',
            rejectLabel: 'לא',
            accept: async () => {

                this.newListType = {...this.typeTable.selection};

                await this.listService.deleteListType(this.newListType.Id);

                this.afterCloseDialog();
            },
            reject: () => {
                return;
            }

        })

    }

    onEditListType() {

        this.newListType = {...this.typeTable.selection};
        this.showListTypeDialog = true;

    }

    async saveListType() {

        await this.listService.saveListType(this.newListType);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

        this.afterCloseDialog();

    }

    async updateListType() {

        await this.listService.updateListType(this.newListType);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemUpdateSuccessfully});

        this.afterCloseDialog();

    }

    //#endregion

    //#region [ListItem methods]

    private async loadListItems() {

        this.allListItems = await this.listService.getItemList();

        this.changeListItems();
    }

    changeListItems() {

        this.currentListItems = this.allListItems
            .filter(x => x.ListTypeId == this.selectedType)
            .sort((a, b) => a.Key - b.Key);

    }

    onNewListItem() {

        this.listForm.resetForm();

        this.newListItem = {};

        this.showListItemDialog = true;

        if (this.currentListItems.length > 0) {

            const maxKey = Math.max(...this.currentListItems.map(item => item.Key));

            this.newListItem = {Key: maxKey + 1};

        } else {
            this.newListItem = {Key: this.selectedType + 1};
        }

    }

    async saveListItem() {

        this.newListItem.ListTypeId = this.selectedType;

        if (this.currentListItems.length > 0) {
            this.newListItem.ListItemDepId = this.currentListItems.at(0).ListItemDepId;
        }

        await this.listService.saveListItem(this.newListItem);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

        this.afterCloseDialog();

    }

    async updateListItem() {

        await this.listService.updateListItem(this.newListItem);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemUpdateSuccessfully});

        this.afterCloseDialog();

    }

    async onDeleteListItem() {

        this.confirmService.confirm({
            header: DialogMessage.DeleteListItem,
            message: DialogMessage.ConfirmQuestion,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'כן',
            rejectLabel: 'לא',
            accept: async () => {

                this.newListItem = {...this.listTable.selection};

                await this.listService.deleteListItem(this.newListItem.Key);

                this.afterCloseDialog();
            },
            reject: () => {
                return;
            }

        })


    }

    onEditListItem() {

        this.newListItem = {...this.listTable.selection};
        this.showListItemDialog = true;

    }


    //#endregion
}
