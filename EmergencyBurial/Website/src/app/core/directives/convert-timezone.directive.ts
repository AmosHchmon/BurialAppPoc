import {Directive, SimpleChanges, HostListener, ElementRef} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  selector: '[appConvertTimezone]'
})
export class ConvertTimezoneDirective {
  constructor(public el: ElementRef, public model: NgModel) {
  }

  @HostListener('onSelect', ['$event'])
  onSelect(value: SimpleChanges) {

    let date: Date = this.model.value;

    let day = date.getDate();

    let month = date.getMonth();

    let year = date.getFullYear();

    let hour = date.getHours();

    let minutes = date.getMinutes();

    this.model.viewToModelUpdate(new Date(Date.UTC(year, month, day, hour, minutes)));

  }

}
