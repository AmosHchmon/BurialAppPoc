import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

import {SideMenuService} from '../../../shared/services/side-menu.service';
import {IMenuItem} from '../model/menu-item';
import {AppContextService} from '../../../shared/services/app-context.service';
import {AuthContextService} from '../../../shared/services/auth-context.service';
import {IPlanBudgetQuery} from '../../../views/dashboard/model/plan-budget-query';
import {PlanEmitterService} from '../../../shared/services/plan-emitter.service';
import {IBudgetTotal} from '../../../views/report/model/plan-budget-total';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {

  @Input() isMenuOpen: boolean | undefined;
  @Output() sideMenuEvent = new EventEmitter<boolean>();
  public currentYear: number;
  public menuItems: IMenuItem[];
  public planBudget: IPlanBudgetQuery;
  public total: IBudgetTotal;
  private totalSubscription: Subscription;
  private closeMenuSubscription: Subscription;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private sideMenuService: SideMenuService,
              public authCtx: AuthContextService,
              private planEmitterService: PlanEmitterService,
              private appCtx: AppContextService){
  }

  async ngOnInit(){

    this.currentYear = this.appCtx.PlanBudgetYear;
    this.menuItems = await this.sideMenuService.loadMenuItems();

    this.totalSubscription = this.planEmitterService.totalSubject.subscribe((data) => {

      this.total = data;

    });

    this.closeMenuSubscription = this.planEmitterService.closeMenuEmitter.subscribe(() => {

      this.isMenuOpen = false;
    });

  }

  getExcessColor(){

    const difference = this.planBudget?.Income - this.planBudget?.Expense;

    return difference < 0 ? 'text-danger' : 'text-success';
  }

  toggleMenu(){

    this.menuItems.forEach(item => {
      item.IsCollapse = false;
    });

    this.isMenuOpen = !this.isMenuOpen;

    setTimeout(() => {

      this.menuItems.forEach(item => {
        item.IsCollapse = true;
      });

    }, 500);

  }

  ngOnDestroy() {

    if (this.totalSubscription) {
      this.totalSubscription.unsubscribe();
    }
    if (this.closeMenuSubscription) {
      this.closeMenuSubscription.unsubscribe();
    }
  }

  protected readonly parseInt = parseInt;
}
