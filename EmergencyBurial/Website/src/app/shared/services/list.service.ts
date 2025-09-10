import { Injectable, Injector } from '@angular/core';
import {IListItem, IOptionItem} from '../model/list-item';
import { IListType } from '../model/list-type';
import { enmListType } from '../enum/list-type.enum';
import { ddlListItem } from '../ui-components/model/drop-down-item';
import { BaseService } from 'src/app/core/abstract/base-service';

@Injectable({
  providedIn:"root"
})
export class ListService extends BaseService {

  private ListItems: Array<IListItem>;

  constructor(protected injector: Injector) {
    super("ListService", injector);
  }

   getItemList(): Promise<IListItem[]> {

     return super.get<IListItem[]>({path:'/listitem'})
      .then((res) => {

        this.ListItems = res;

        return res;

      });
  }

  getBurialBodyList(): Promise<IOptionItem[]> {

    return super.get<IOptionItem[]>({path:'/burial-body'})

  }

  getBurialTypeList(): Promise<IOptionItem[]> {

    return super.get<IOptionItem[]>({path:'/burial-type'})

  }

  getTypeList(): Promise<IListType[]> {

    return super.get<IListItem[]>({ path: '/listtype' });

  }


  //#region [helper methods]

  public async GetListByType(listType: enmListType) {

    let list = Array<IListItem>();

    if (!this.ListItems) {

      list = await this.getItemList();

    } else {

      list = this.ListItems;

    }

    return list.filter(x => x.ListTypeId == listType);

  }

  public async GetListItemByType(listType: enmListType) {

    let list = Array<IListItem>();

    if (!this.ListItems) {

      list = await this.getItemList();

    } else {

      list = this.ListItems;

    }

    let resultList = list.filter(x => x.ListTypeId == listType).map(x => new ddlListItem(x.Text, x.Key));

    return resultList;

  }

  //#endregion
}
