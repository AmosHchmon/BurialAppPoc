import {Component, Input, Output} from '@angular/core';
import {BurialDetails} from "../../model/BurialDetails";
import {BurialCoordination} from "../../model/BurialCoordination";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {DeceasedAccordion} from "../../model/DeceasedAccordion";

@Component({
  selector: 'app-burial-form',
  imports: [],
  templateUrl: './burial-form.component.html',
  styleUrl: './burial-form.component.scss'
})
export class BurialFormComponent {

  @Input('data') data: DeceasedAccordion;
  @Output('saveMethod') save;

  fieldsPart1: IColumn[];
  fieldsPart2: IColumn[];

  ngOnInit() {

    this.fieldsPart1 = this?.data.fields.slice(0, this.data.splitIndex);
    this.fieldsPart2 = this?.data.fields.slice(this.data.splitIndex);
  }
}
