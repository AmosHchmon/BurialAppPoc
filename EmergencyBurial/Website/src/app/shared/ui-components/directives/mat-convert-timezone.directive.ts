import { Directive, Input, SimpleChanges, HostListener, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { OnChanges } from '@angular/core';

@Directive({
  selector: '[appConvertTimezone]'
})
export class MatConvertTimezoneDirective implements OnChanges {
  constructor(public el: ElementRef, public model: NgModel) {
  }

  @HostListener('dateChange')
  ngOnChanges(value: SimpleChanges) {

    let date: Date = this.model.value;

    let day = date.getDate();

    let month = date.getMonth();

    let year = date.getFullYear();

    let hour = date.getHours();
    //let hour = date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
    
    let minutes = date.getMinutes();

    this.model.viewToModelUpdate(new Date(Date.UTC(year, month, day,hour,minutes)));

  }

}
