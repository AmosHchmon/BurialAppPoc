import {Component, OnInit} from '@angular/core';
import {Card} from "primeng/card";
import {TableModule} from "primeng/table";
import {Deceased} from "../../model/deceased";
import {AlertService} from "../../../../../shared/services/alert.service";
import {DeceasedService} from "../../services/deceased.service";

interface IColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-deceased',
  imports: [
    Card,
    TableModule
  ],
  templateUrl: './deceased.component.html',
  standalone: true,
  styleUrl: './deceased.component.scss',
})
export class DeceasedComponent implements OnInit{

  cols: IColumn[] = [];
  deceasedList: Deceased[] = [];

  constructor(private deceasedService: DeceasedService, private alertService: AlertService) {

    this.deceasedService = deceasedService;
    this.alertService = alertService;
  }

  async ngOnInit() {

    try {

      this.deceasedList = await this.deceasedService.getDeceaseds();

      this.initCols();

    } catch (err) {
      this.alertService.error(err);
    }

  }

  initCols() {
    this.cols = [
      {field: 'HalalNumber', header: 'HalalNumber'},
      {field: 'IdentityNumber', header: 'IdentityNumber'},
      {field: 'FirstName', header: 'FirstName'},
      {field: 'LastName', header: 'LastName'},
      {field: 'FatherName', header: 'FatherName'},
      {field: 'Gender', header: 'Gender'},
      {field: 'Nationality', header: 'Nationality'},
      {field: 'HomeCity', header: 'HomeCity'},
      {field: 'HomeAddress', header: 'HomeAddress'},
      {field: 'CurrentStatusId', header: 'CurrentStatusId'},
      {field: 'CurrentLocationId', header: 'CurrentLocationId'},
      {field: 'IsLinkedToOtherCasesValue', header: 'IsLinkedToOtherCasesValue'},
      {field: 'BurialCity', header: 'BurialCity'},
      {field: 'IsCivilBurialValue', header: 'IsCivilBurialValue'},
      {field: 'Notes', header: 'Notes'}
    ];
  }
}
