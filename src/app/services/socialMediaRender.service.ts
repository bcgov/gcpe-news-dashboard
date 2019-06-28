import {Injectable} from '@angular/core';

// the following contants should not be rename and they are matching the social media javascript library
declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Injectable()
export class SocialMediaRenderService {

  constructor() {
  }

  initFacebook() {
    FB.init({
      xfbml: true,
      version: 'v3.2'
    });
  }

  loadTwitterWidgets() {
    if (twttr.ready()) {
      twttr.widgets.load();
    }
  }

  loadFacebookWidgets() {
    this.initFacebook();
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

  // load facebookwidget by parsing node id and hide the fb-post or fb-video iframe while loading
  loadFacebookWidgesbyNodeId(node_id: string) {
    FB.XFBML.parse(document.getElementById(node_id), function () {
      const posts = document.getElementById('new-post-list').getElementsByTagName('iframe');
      Array.from(posts).forEach(function(item) {
        setTimeout(function() {
          item.style.visibility = 'hidden';
        }, 100);
     });
    });
  }
}
