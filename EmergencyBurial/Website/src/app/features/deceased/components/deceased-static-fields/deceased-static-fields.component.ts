import {Component, Input, OnInit} from '@angular/core';

import {DeceasedStaticFields} from "../../model/DeceasedStaticFields";
import {IColumn} from "../../../../shared/ui-components/model/column";

@Component({
  selector: 'app-deceased-static-fields',
  imports: [],
  templateUrl: './deceased-static-fields.component.html',
  styleUrl: './deceased-static-fields.component.scss'
})
export class DeceasedStaticFieldsComponent implements OnInit {

  private _data: DeceasedStaticFields;
  @Input('data')
  set data(value: DeceasedStaticFields) {
    this._data = value;
    if (value) {
      this.initFields(value); // קורא לפונקציה בכל פעם שה-Input משתנה
    }
  }
  get data(): DeceasedStaticFields {
    return this._data;
  }

  fieldsPart1: IColumn[];
  fieldsPart2: IColumn[];

  ngOnInit() {

    /*this.fieldsPart1 = this?.data.fields.slice(0, this.data.splitIndex);
    this.fieldsPart2 = this?.data.fields.slice(this.data.splitIndex);*/
  }

  private initFields(data: DeceasedStaticFields) {
    this.fieldsPart1 = data.fields.slice(0, data.splitIndex);
    this.fieldsPart2 = data.fields.slice(data.splitIndex);
  }
}
