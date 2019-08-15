import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserInfoService {
  private ieDisclaimerText = 'NOTE: using IE (Internet Explorer) slightly changes the layout on this page. For a better user experience, please use another browser such as Chrome, Firefox, or Edge when viewing Dashboard content.';
  constructor() { }
  // get browser type: if using ie, the display the posts vertically first since ie does not fully support css grid or flex box
  // reference from : https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
  getBrowser(): boolean {
    if (window.navigator.userAgent.indexOf('Trident') !== -1) {
        return true;
    } else {
        return false;
    }
  }

  isMobile(): boolean {
    if (window.innerWidth <= 800 && window.innerHeight <= 600) {
      return true;
    } else {
      return false;
    }
  }

  getIEDisclaimer(): string {
    return this.ieDisclaimerText;
  }
}
