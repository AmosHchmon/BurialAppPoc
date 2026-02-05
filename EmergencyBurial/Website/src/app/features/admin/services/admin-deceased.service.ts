import {Injectable, Injector} from "@angular/core";

import {BaseService} from "../../../core/abstract/base-service";
import {Deceased} from "../../deceased/model/Deceased";


@Injectable({
  providedIn: 'root'
})
export class AdminDeceasedService extends BaseService {

  constructor(protected injector: Injector) {
    super("AdminDeceasedService", injector);
  }

  async getDeceaseds(): Promise<Deceased[]> {
    return super.get({path: '/'});
  }

  async saveDeceased(deceased: Deceased): Promise<Deceased> {
    return super.post({body: deceased});
  }

  async updateDeceased(deceased: Deceased): Promise<void> {
    return super.put({body: deceased});
  }

  async deleteDeceased(id: number): Promise<void> {
    return super.delete({path: `/${id}`});
  }
}
