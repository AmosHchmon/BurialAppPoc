import {Directive, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';

@Directive()
export abstract class BaseManagementComponent<T> {

  @ViewChild('dt') dt: Table<T> | undefined;

  items: T[] = [];
  currentItem: T = {} as T;

  searchText: string = '';
  showDialog: boolean = false;
  isEdit: boolean = false;

  clearSearch(): void {

    this.searchText = '';

    if (this.dt) {
      this.dt.filterGlobal(null, 'contains');
    }
  }

  protected initNewItem(defaultValues: Partial<T> = {}): void {

    this.currentItem = {...defaultValues} as T;
    this.isEdit = false;
    this.showDialog = true;
  }

  protected initEditItem(item: T): void {

    this.currentItem = structuredClone(item);
    this.isEdit = true;
    this.showDialog = true;
  }

  closeDialog(): void {

    this.showDialog = false;
    this.currentItem = {} as T;

    if (this.dt) {
      this.dt.selection = null;
    }
  }
}
