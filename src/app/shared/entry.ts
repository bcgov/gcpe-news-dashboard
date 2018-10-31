import { WeekDay } from '@angular/common';

export class Entry {
    day: WeekDay;
    date: string;
    entrydetails: details[]
  }

  class details {
    title: '';
    ministrylabel: '';
    text:'';
};
 