import {Injectable, Injector} from "@angular/core";

import {BaseService} from "../../../core/abstract/base-service";
import {Deceased} from "../../deceased/model/Deceased";
import {DeceasedBag} from "../../deceased/model/DeceasedBag";


@Injectable({
  providedIn: 'root'
})
export class ManageService extends BaseService {

  constructor(protected injector: Injector) {
    super("ManageService", injector);
  }

  async getDeceaseds(): Promise<Deceased[]> {
    return super.get({path: '/'});
  }

  async saveDeceased(deceased: Deceased): Promise<Deceased> {
    return super.post({path: '/add-deceased', body: deceased});
  }

  async updateDeceased(deceased: Deceased): Promise<void> {
    return super.put({path: 'update-deceased', body: deceased});
  }

  async deleteDeceased(id: number): Promise<void> {
    return super.delete({path: `delete-deceased/${id}`});
  }

  async addBag(newBag: DeceasedBag): Promise<DeceasedBag> {
    return super.post({path: '/add-bag', body: newBag});
  }

  async updateBag(bag: DeceasedBag): Promise<void> {
    return super.put({body: bag});
  }
}
