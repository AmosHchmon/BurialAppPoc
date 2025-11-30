import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {DeceasedStaticFields} from "../../model/DeceasedStaticFields";
import {IColumn} from "../../../../shared/ui-components/model/column";

@Component({
  selector: 'app-deceased-static-fields',
  templateUrl: './deceased-static-fields.component.html',
  styleUrls: ['./deceased-static-fields.component.scss']
})
export class DeceasedStaticFieldsComponent implements OnChanges {

  @Input() data: DeceasedStaticFields;

  fieldsPart1: IColumn[] = [];
  fieldsPart2: IColumn[] = [];

  ngOnChanges(changes: SimpleChanges) {

    if (changes['data']?.currentValue) {
      this.initFields(this.data);
    }
  }

  private initFields(data: DeceasedStaticFields) {
    this.fieldsPart1 = data.fields.slice(0, data.splitIndex);
    this.fieldsPart2 = data.fields.slice(data.splitIndex);
  }
}
