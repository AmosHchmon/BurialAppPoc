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
  @Input() fields: IColumn[] = [];

  fieldsPart1: IColumn[] = [];
  fieldsPart2: IColumn[] = [];

  ngOnInit() {

    const splitIndex = 4;
    this.fieldsPart1 = this.fields.slice(0, splitIndex);
    this.fieldsPart2 = this.fields.slice(splitIndex);

  }


}
