import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../model/transport";
import {IColumn} from "../../../../shared/ui-components/model/column";

@Component({
  selector: 'app-transports-table',
  imports: [UiComponentsModule],
  templateUrl: './transports-table.component.html',
  styleUrl: './transports-table.component.scss'
})
export class TransportsTableComponent implements OnInit {

  @Input() transports: Transport[];
  @Output() openDialog = new EventEmitter<boolean>();

  transportCols: IColumn[];

  ngOnInit() {

    this.transportCols = [
      {field: 'Id', header: 'מזהה שינוע'},
      {field: 'FirstName', header: 'שם החלל'},
      {field: 'StartLocation', header: 'מקום התחלת שינוע'},
      {field: 'StartDateTime', header: 'מועד התחלת שינוע'}
    ];
  }

  openTransportDialog() {

    this.openDialog.emit(true);
  }
}
