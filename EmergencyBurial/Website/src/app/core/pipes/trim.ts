import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trim',
    standalone: false
})
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return '';
    }
    return value.trim();
  }
}
