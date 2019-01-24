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
    twttr.events.bind('rendered', function(event) {
      console.log('lots rendered');
    });
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

  loadWidgets(mediaType: any) {
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

  loadWidget(mediaType: any, DOM: any): any {
    switch (mediaType) {
      case 'Facebook':
        this.loadFacebookWidget(DOM);
        break;
      case 'Twitter':
        const res = this.loadTwitterWidget(DOM);
        console.log(res);
        break;
      case 'Instagram':
        this.loadInstagramWidgets();
    }
  }

  loadTwitterWidget(DOM: any) {
    if (twttr.ready()) {
      twttr.widgets.load(DOM);
    }
    twttr.events.bind('rendered', function(event) {
    });
  }

  loadFacebookWidget(DOM: any) {
    FB.init({
      xfbml: true,
      version: 'v3.2'
    });
    FB.XFBML.parse(DOM);
  }

  loadInstagramWidget() {
    instgrm.Embeds.process();
  }

}
