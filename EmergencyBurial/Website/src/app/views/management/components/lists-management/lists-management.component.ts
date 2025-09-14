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
  selectedList: IListType | null;
  listsColumns: IColumn[];

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

  private async loadListTypes(){

    this.lists = await this.listService.getTypeList();
  }

  openNew() {

  }

  deleteSelectedList() {

  }

  editSelectedListType() {

  }
}
