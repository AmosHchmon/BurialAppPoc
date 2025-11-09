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

  @Input('data') data: DeceasedStaticFields;

  fieldsPart1: IColumn[];
  fieldsPart2: IColumn[];

  ngOnInit() {

    this.fieldsPart1 = this?.data.fields.slice(0, this.data.splitIndex);
    this.fieldsPart2 = this?.data.fields.slice(this.data.splitIndex);
  }
}
