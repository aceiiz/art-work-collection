import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'compareYearDisplay' })
export class CompareYearDisplayPipe implements PipeTransform {
  transform(year_start: any, date_end: any) {
    if (year_start && date_end) {
      if (year_start === date_end) {
        return `(${year_start})`;
      } else {
        return `(${year_start} - ${date_end})`;
      }
    } else if (year_start) {
      return `(${year_start})`;
    } else if (date_end) {
      return `(${date_end})`;
    } else {
      return '';
    }
  }
}
