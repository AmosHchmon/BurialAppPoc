import {Component, Input, OnInit} from '@angular/core';

import {IColumn} from "../../../../shared/ui-components/model/column";
import {DeceasedAccordion} from "../../model/DeceasedAccordion";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";

@Component({
  selector: 'app-deceased-accordion-content',
  imports: [UiComponentsModule],
  templateUrl: './deceased-accordion-content.component.html',
  styleUrl: './deceased-accordion-content.component.scss'
})
export class DeceasedAccordionContentComponent implements OnInit {

  @Input() data: DeceasedAccordion;

  fieldsPart1: IColumn[];
  fieldsPart2: IColumn[];

  ngOnInit() {

    this.fieldsPart1 = this?.data.fields.slice(0, this.data.splitIndex);
    this.fieldsPart2 = this?.data.fields.slice(this.data.splitIndex);
  }
}
