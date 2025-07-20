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

  @Input() deceased:Deceased;
  @Input() cols: IColumn[] = [];

  ngOnInit(){

  }


}
