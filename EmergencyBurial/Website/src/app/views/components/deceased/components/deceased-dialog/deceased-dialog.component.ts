import {Component, Input, OnInit} from '@angular/core';
import {Deceased} from "../../model/deceased";
import {IColumn} from "../../../../../shared/ui-components/model/column";

@Component({
  selector: 'app-deceased-dialog',
  imports: [],
  templateUrl: './deceased-dialog.component.html',
  styleUrl: './deceased-dialog.component.scss'
})
export class DeceasedDialogComponent implements OnInit {

  @Input() deceased: Deceased;
  @Input() cols: IColumn[] = [];

  colsPart1: IColumn[] = [];
  colsPart2: IColumn[] = [];

  ngOnInit() {

    const splitIndex = 4; // שנה את זה למספר העמודות הרצוי בחלק הראשון
    this.colsPart1 = this.cols.slice(0, splitIndex);
    this.colsPart2 = this.cols.slice(splitIndex);

  }


}
