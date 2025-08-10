import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {Deceased} from '../../model/deceased';
import {DeceasedService} from '../../services/deceased.service';
import {IColumn} from "../../../../../shared/ui-components/model/column";

@Component({
  selector: 'app-deceased-detail',
  standalone: true,
  imports: [CommonModule, CardModule, AccordionModule],
  templateUrl: './deceased-detail.component.html',
  styleUrl: './deceased-detail.component.scss'
})
export class DeceasedDetailComponent implements OnInit {

  deceased: Deceased | null = null;
  fieldsPart1: IColumn[] = [];
  fieldsPart2: IColumn[] = [];

  constructor(
    private route: ActivatedRoute,
    private deceasedService: DeceasedService
  ) {
  }

  ngOnInit(): void {
    this.loadDeceasedData();
  }

  async loadDeceasedData(): Promise<void> {

    const param = this.route.snapshot.paramMap.get('id');

    this.deceased = await this.deceasedService.getDeceasedById(param);

    this.initializeFields();

  }

  initializeFields(): void {

    const allFields = [
      {field: 'HalalNumber', header: 'מספר חלל'},
      {field: 'IdentityNumber', header: 'מספר זהות'},
      {field: 'FirstName', header: 'שם פרטי'},
      {field: 'LastName', header: 'שם משפחה'},
      {field: 'FatherName', header: 'שם האב'},
      {field: 'Gender', header: 'מין'},
      {field: 'Nationality', header: 'לאום'},
      {field: 'HomeCity', header: 'עיר מגורים'},
      {field: 'HomeAddress', header: 'כתובת'},
      {field: 'CurrentStatusId', header: 'סטטוס'},
      {field: 'CurrentLocationId', header: 'מיקום'},
      {field: 'BurialCity', header: 'עיר קבורה'},
      {field: 'IsLinkedToOtherCasesValue', header: 'מקושר למקרים'},
      {field: 'IsCivilBurialValue', header: 'קבורה אזרחית'},
      {field: 'Notes', header: 'הערות'}
    ];

    const splitIndex = 7;

    this.fieldsPart1 = allFields.slice(0, splitIndex);
    this.fieldsPart2 = allFields.slice(splitIndex);
  }
}
