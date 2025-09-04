import {Component, Input, OnInit} from '@angular/core';

import {DeceasedBagDetails} from "../../model/DeceasedBagDetails";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IColumn} from "../../../../shared/ui-components/model/column";

@Component({
  selector: 'app-deceased-bag-details',
  imports: [UiComponentsModule],
  templateUrl: './deceased-bag-details.component.html',
  styleUrl: './deceased-bag-details.component.scss'
})
export class DeceasedBagDetailsComponent implements OnInit {

  @Input() bagDetails: DeceasedBagDetails;

  fieldsPart1: IColumn[];
  fieldsPart2: IColumn[];

  ngOnInit() {

    this.initializeFields();
  }

  private initializeFields(): void {


    const allFields = [
      {field: 'FullName', header: 'חלל'},
      {field: 'IdentityNumber', header: 'מספר תעודת זהות'},
      {field: 'Affiliation', header: 'ארגון שיוך'},
      {field: 'ReceivingStation', header: 'תחנת קליטה'},
      {field: 'LastKnownLocation', header: 'מיקום אחרון'},
      {field: 'PartDescription', header: 'תיאור חלק'},
      {field: 'RelatedBagNumbers', header: 'מספר שקים מקושרים'},
      {field: 'CanBeIdentifiedByAcquaintance', header: 'האם ניתן לזהות בהיכרות אישית'},
      {field: 'ReceivingNotes', header: 'הערות שנרשמו בעת הקליטה בתר"ח'},
      {field: 'FillerName', header: 'שם ממלא טופס הקליטה'},
      {field: 'ArrivalDateTime', header: 'תאריך ושעת ההגעה'},
      {field: 'BroughtBy', header: 'הגורם שהביא את השק'},
      {field: 'BroughtFrom', header: 'המיקום ממנו הובא השק'}
    ]

    const splitIndex = 7;

    this.fieldsPart1 = allFields.slice(0, splitIndex);
    this.fieldsPart2 = allFields.slice(splitIndex);
  }
}
