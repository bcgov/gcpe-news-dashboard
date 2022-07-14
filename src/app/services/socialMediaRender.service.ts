import { Injectable } from '@angular/core';

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
      appId: '290738601563206',
      xfbml: true,
      version: 'v14.0',
      autoLogAppEvents : false,

    });

  }

  loadTwitterWidgets() {
    if (twttr.ready()) {
      twttr.widgets.load();
    }
  }

  loadFacebookTimeline() {
    //this.initFacebook();
    FB.XFBML.parse();
  }

  loadFacebookWidgets() {
    this.initFacebook();
    Array.from(document.getElementsByClassName('fb-post')).forEach(function (item) {
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

  loadWidgetsWithOptions(mediaType: string, hide: boolean, node: string) {
    switch (mediaType) {
      case 'Facebook':
        this.loadFacebookWidgesbyNodeId(node, hide);
        break;
      case 'Twitter':
        this.loadTwitterWidgets();
        break;
      case 'Instagram':
        this.loadInstagramWidgets();
    }
  }

  // load facebookwidget by parsing node id and hide the fb-post or fb-video iframe while loading
  loadFacebookWidgesbyNodeId(node_id: string, hide: boolean) {
    this.initFacebook();
    FB.XFBML.parse(document.getElementById(node_id), function () {
      if (hide) {
        const node = document.getElementById(node_id);
        if (node) {
          const posts = document.getElementById(node_id).getElementsByTagName('iframe');
          Array.from(posts).forEach(function (item) {
            setTimeout(function () {
              item.style.visibility = 'hidden';
            }, 50);
          });
        }
      }
    });
  }

  // hiden twitter post while fist loaded
  HideTwitterPostsAfterLoaded() {
    twttr.events.bind(
      'loaded',
      function (event) {
        event.widgets.forEach(function (widget) {
          widget.style.marginTop = 0;
          widget.style.visibility = 'hidden';
        });
      }
    );
  }

  toggleTwitterPosts(visible: boolean) {
    const twitterList = document.getElementsByTagName('twitter-widget');
    Array.from(twitterList).forEach(function (item) {
      setTimeout(function () {
        const id = item.id;
        const elem = document.getElementById(id);
        elem.style.visibility = visible ? 'visible' : 'hidden';
      }, 50);
    });
  }

  // toggle iframe post, includes facebook and instagram
  toggleIframePosts(node: string, visible: boolean) {
    const nodeEl = document.getElementById(node);
    if (nodeEl) {
      const facebookList = document.getElementById(node).getElementsByTagName('iframe');
      Array.from(facebookList).forEach(function (item) {
        setTimeout(function () {
          item.style.visibility = visible ? 'visible' : 'hidden';
        }, 50);
      });
    }
  }

}
