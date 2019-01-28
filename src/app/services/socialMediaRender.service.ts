import {Injectable} from '@angular/core';

// the following contants should not be rename and they are matching the social media javascript library
declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Injectable()
export class SocialMediaRenderService {

  constructor() {
  }

  loadTwitterWidgets() {
    if (twttr.ready()) {
      twttr.widgets.load();
    }
  }

  loadFacebookWidgets() {
    FB.init({
      xfbml: true,
      version: 'v3.2'
    });
    Array.from(document.getElementsByClassName('fb-post')).forEach(function(item) {
      FB.XFBML.parse(item);
   });
  }

  loadInstagramWidgets() {
    instgrm.Embeds.process();
  }

  loadWidgets(mediaType: string) {
    switch (mediaType) {
      case 'Facebook':
        this.loadFacebookWidgets();
        break;
      case 'Twitter':
        this.loadTwitterWidgets();
        break;
      case 'Instagram':
        this.loadInstagramWidgets();
    }
  }
}
