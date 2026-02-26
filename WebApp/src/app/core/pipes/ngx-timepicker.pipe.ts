import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ngxTimepicker',
    standalone: false
})
export class NgxTimepickerPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const date = new Date(value);

    if (date.toString() !== "Invalid Date") {
      return date.getHours() + ':' + date.getMinutes();
    }

    return value;

  }

}
