import { Injectable } from '@angular/core';

declare const snowplow: any;

@Injectable()
export class SnowplowService {

  constructor() {
  }

  trackPageView() {
    snowplow('trackPageView');
  }
}
