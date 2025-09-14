import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IListType} from "../../../../shared/model/list-type";
import {ListService} from "../../../../shared/services/list.service";
import {IColumn} from "../../../../shared/ui-components/model/column";

@Component({
  selector: 'app-list-side-menu-management',
  imports: [UiComponentsModule],
  templateUrl: './lists-management.component.html',
  styleUrl: './lists-management.component.scss'
})
export class ListsManagementComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  lists: IListType[] = [];
  selectedListType: IListType | null;
  listsColumns: IColumn[];
  showDialog: boolean = false;
  newListType: IListType = null;

  constructor(private listService: ListService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.listsColumns = [
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

    this.loadListTypes();
  }

  private async loadListTypes() {

    this.lists = await this.listService.getTypeList();
  }

  onNewListType() {

    this.showDialog = true;
    this.newListType = {};

  }

  async deleteSelectedListType() {

    this.newListType = {...this.dt.selection};
    this.newListType.IsValid = false;

    await this.listService.updateListType(this.newListType);

    this.afterCloseDialog();

  }

  onEditListType() {

    this.newListType = {...this.dt.selection};
    this.showDialog = true;

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

    this.showDialog = false;
    this.newListType = {};
    this.dt.selection = null

    await this.loadListTypes();

    this.cd.detectChanges();

  }
}
