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

  // checking explorer whether it is Edge
  isEdge() {
    if (window.navigator.userAgent.indexOf('Edge') !== -1) {
      return true;
    } else {
        return false;
    }
  }

  isMobile(): boolean {
      if ( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ) {
         return true;
       } else {
         return false;
       }
  }

  getIEDisclaimer(): string {
    return this.ieDisclaimerText;
  }

  getDeviceMemory(): number {
    return window.navigator.hardwareConcurrency;
  }
}
