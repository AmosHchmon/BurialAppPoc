import {Injectable} from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  get FilterValue(): string {
    return this.session.retrieve("filter-value");
  }

  set FilterValue(val: string) {
    this.session.store("filter-value", val);
  }

  constructor( private storage: LocalStorageService,
               private session: SessionStorageService) { }

  clearFilters(){
    this.session.clear("filter-value");
  }

}
