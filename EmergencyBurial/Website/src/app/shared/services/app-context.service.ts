import {Injectable} from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  get CouncilId(): number {
    return this.session.retrieve("council-id");
  }
  set CouncilId(val: number) {
    this.session.store("council-id", val);
  }

  get PlanBudgetId(): string {
    return this.session.retrieve("plan-budget-id");
  }
  set PlanBudgetId(val: string) {
    this.session.store("plan-budget-id", val);
  }

  get FormId(): string {
    return this.session.retrieve("form-id");
  }

  set FormId(val: string) {
    this.session.store("form-id", val);
  }

  get QuarterId(): string {
    return this.session.retrieve("quarter-id");
  }

  set QuarterId(val: string) {
    this.session.store("quarter-id", val);
  }

  get PlanBudgetYear(): number {
    return this.session.retrieve("plan-budget-year");
  }

  set PlanBudgetYear(val: number) {
    this.session.store("plan-budget-year", val);
  }

  get ReportReadOnly(): boolean {
    return this.session.retrieve("report-read-only");
  }

  set ReportReadOnly(val: boolean) {
    this.session.store("report-read-only", val);
  }

  get MappedMenuItems(): {} {
    return this.storage.retrieve("mapped-menu-items");
  }

  set MappedMenuItems(val: {}) {
    this.storage.store("mapped-menu-items", val);
  }

  /*get SalaryItems(): IPlanSalaryItemInfo[] {
    return this.session.retrieve("salary-items");
  }

  set SalaryItems(val: IPlanSalaryItemInfo[]){
    this.session.store("salary-items", val);
  }*/

  /*get SourceSalaryItems(): IPlanSalaryItemInfo[] {
    return this.session.retrieve("source-salary-items");
  }

  set SourceSalaryItems(val: IPlanSalaryItemInfo[]){
    this.session.store("source-salary-items", val);
  }*/

  get FilterPlanBudgetStatus(): number {
    return this.session.retrieve("plan-budget-status-filter");
  }

  set FilterPlanBudgetStatus(val: number) {
    this.session.store("plan-budget-status-filter", val);
  }

  get FilterYear(): number {
    return this.session.retrieve("year-filter");
  }

  set FilterYear(val: number) {
    this.session.store("year-filter", val);
  }

  get FilterValue(): string {
    return this.session.retrieve("filter-value");
  }

  set FilterValue(val: string) {
    this.session.store("filter-value", val);
  }

  constructor( private storage: LocalStorageService,
               private session: SessionStorageService) { }

  clearFilters(){
    this.session.clear("plan-budget-status-filter");
    this.session.clear("year-filter");
    this.session.clear("filter-value");
  }

}
