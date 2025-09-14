import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IListType} from "../../../../shared/model/list-type";
import {ListService} from "../../../../shared/services/list.service";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {IListItem} from "../../../../shared/model/list-item";

@Component({
  selector: 'app-list-side-menu-management',
  imports: [UiComponentsModule],
  templateUrl: './lists-management.component.html',
  styleUrl: './lists-management.component.scss'
})
export class ListsManagementComponent implements OnInit {

  @ViewChild('dt1') dt1!: Table;
  @ViewChild('dt2') dt2!: Table;

  listTypes: IListType[] = [];
  allListItems: IListItem[] = [];
  currentListItems: IListItem[] = [];
  listTypesColumns: IColumn[];
  listItemsColumns: IColumn[];
  showListTypeDialog: boolean = false;
  showListItemDialog: boolean = false;
  newListType: IListType = null;
  newListItem: IListItem = null;
  selectedType: number;


  constructor(private listService: ListService, private cd: ChangeDetectorRef) {
  }

  async ngOnInit() {

    this.listTypesColumns = [
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

    ]

    this.listItemsColumns = [
      {
        field: 'Id',
        header: 'מזהה'
      },
      {
        field: 'Text',
        header: 'תיאור'
      },
      {
        field: 'Description',
        header: 'הסבר'
      }
    ]

    await this.loadListTypes();
    await this.loadListItems();
  }

  private async loadListTypes() {

    this.listTypes = await this.listService.getTypeList();

    this.selectedType = this.listTypes.at(0).Id;
  }

  private async loadListItems() {

    this.allListItems = await this.listService.getItemList();

    this.changeListItems();
  }

  onNewListType() {

    this.showListTypeDialog = true;
    this.newListType = {};

  }

  async onDeleteListType() {

    this.newListType = {...this.dt1.selection};
    this.newListType.IsValid = false;

    await this.listService.updateListType(this.newListType);

    this.afterCloseDialog();

  }

  onEditListType() {

    this.newListType = {...this.dt1.selection};
    this.showListTypeDialog = true;

  }

  async saveListType() {

    await this.listService.saveListType(this.newListType);

    this.afterCloseDialog();
  }

  async updateListType() {

    await this.listService.updateListType(this.newListType);

    this.afterCloseDialog();

  }

  private async afterCloseDialog() {

    this.showListTypeDialog = false;
    this.showListItemDialog = false;

    this.newListType = {};
    this.newListItem = {};

    this.dt1.selection = null
    this.dt2.selection = null

    await this.loadListTypes();
    await this.loadListItems();

    this.cd.detectChanges();

  }

  changeListItems() {

    this.currentListItems = this.allListItems
      .filter(x => x.ListTypeId == this.selectedType)
      .sort((a, b) => a.Key - b.Key);

  }

  onNewListItem() {

    this.showListItemDialog = true;
    this.newListItem = {Key: this.currentListItems.at(-1).Key + 1};

  }

  async saveListItem() {

    this.newListItem.ListTypeId = this.selectedType;
    this.newListItem.ListItemDepId = this.currentListItems.at(0).ListItemDepId;

    await this.listService.saveListItem(this.newListItem);

    this.afterCloseDialog();

  }

  async updateListItem() {

    await this.listService.updateListItem(this.newListItem);

    this.afterCloseDialog();

  }

  async onDeleteListItem() {

    this.newListItem = {...this.dt2.selection};

    await this.listService.deleteListItem(this.newListItem.Key);

    this.afterCloseDialog();
  }

  onEditListItem() {

    this.newListItem = {...this.dt2.selection};
    this.showListItemDialog = true;

  }
}
