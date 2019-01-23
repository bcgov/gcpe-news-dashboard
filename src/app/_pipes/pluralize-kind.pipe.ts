import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
  name: 'pluralizeKind'
})
export class PluralizeKindPipe implements PipeTransform {

  transform(value: string): string {
    if (value.charAt(value.length-1) === 'y')
      return value.substr(0, value.length-1) + 'ies';
    return value + 's';
  }

}
