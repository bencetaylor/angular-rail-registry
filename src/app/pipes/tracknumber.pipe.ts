import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tracknumber',
})
export class TracknumberPipe implements PipeTransform {
  formatted: string;

  transform(value: any): any {
    this.formatted =
      value.substring(0, 2) +
      ' ' +
      value.substring(2, 4) +
      ' ' +
      value.substring(4, 8) +
      ' ' +
      value.substring(8, 9);
    return this.formatted;
  }
}
