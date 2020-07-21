import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import voca from 'voca';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public includes(array, value): boolean {
    return _.contains(array, value);
  }

  public intersection(array1, array2): Array<string> {
    return _.intersection(array1, array2);
  }
}
