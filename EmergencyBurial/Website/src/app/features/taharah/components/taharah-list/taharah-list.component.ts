import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {Router} from '@angular/router';
import {Popover} from "primeng/popover";

import {Deceased} from "../../../deceased/model/Deceased";
import {TaharahService} from "../../services/taharah.service";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";

@Component({
  selector: 'app-taharah-list',
  templateUrl: './taharah-list.component.html',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  styleUrls: ['./taharah-list.component.scss']
})
export class TaharahListComponent implements OnInit {

  @ViewChild('op') op!: Popover;
  @ViewChild('dt') dt: Table | undefined;

  cols: IColumn[] = [
    {field: 'HalalNumber', header: 'מספר שק חלל'},
    {field: 'FirstName', header: 'שם פרטי'},
    {field: 'LastName', header: 'שם משפחה'},
    {field: 'FatherName', header: 'שם האב'},
    {field: 'Actions', header: 'פעולות'}
  ];

  deceasedList: Deceased[] = [];
  isAdvancedFilter: boolean = false;
  showAll: boolean = false;
  selectedMonth: Date = new Date();
  searchText: string;

  constructor(private taharahService: TaharahService, private router: Router) {
  }

  ngOnInit(): void {

    this.loadData();
  }

  async loadData() {

    this.deceasedList = [];

    if (!this.isAdvancedFilter) {

      this.deceasedList = await this.taharahService.getPendingList();

    } else {

      const month = this.selectedMonth.getMonth() + 1;
      const year = this.selectedMonth.getFullYear();

      this.deceasedList = await this.taharahService.getHistoryList(month, year);

      this.toggle(new MouseEvent('click'));
    }

  }

  openDetails(deceased: Deceased) {
    this.router.navigate(['/burial/details', deceased.Id]);
  }

  clearSearch() {

    this.searchText = '';

    if (this.dt) {
      this.dt.filterGlobal(null, 'contains');
    }
  }


  toggle($event: MouseEvent) {
    this.op.toggle(event);
  }

  applyFilter() {

    this.isAdvancedFilter = true;
    this.loadData();
  }

  clearFilter() {

    this.showAll = false;
    this.selectedMonth = new Date();
    this.isAdvancedFilter = false;

    this.loadData();
  }
}
