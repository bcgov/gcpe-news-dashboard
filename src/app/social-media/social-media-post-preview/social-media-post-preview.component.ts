import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { url } from 'inspector';

// the following readonly names need to match the names from the social media sdk
declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-post-preview',
  templateUrl: './social-media-post-preview.component.html',
  styleUrls: ['./social-media-post-preview.component.scss']
})
export class SocialMediaPostPreviewComponent implements OnInit, AfterViewInit {
  @Input() url;
  postExt: SocialMediaPostExtended;

  initSocialMediaPostInfo(postUrl: string) {
    const postExt = new SocialMediaPostExtended({ url: "https://twitter.com/BCGovNews/status/1083504133670236161" });
    console.log(postExt);
    postExt.mediaType = 'Twitter';
  }

  constructor() {
    console.log(this.url);
    this.initSocialMediaPostInfo('');
  }

  ngOnInit() {
    this.initSocialMediaPostInfo('');
  }

  ngAfterViewInit() {
    this.loadTwitterWidgets();
  }

  loadTwitterWidgets() {
    if (twttr.ready()) {
      twttr.widgets.load();
    }
  }

  loadFacebookWidgets() {
    // remove the fb-post class from the posts that have already been rendered so they don't flicker when we parse/render the next one
    const fbPosts = document.getElementsByClassName('fb-post');
    for (let i = fbPosts.length - 1; i >= 0; i--) {
      fbPosts[i].className = fbPosts[i].className.replace('fb-post ', '');
    }
    FB.init({
      xfbml: true,
      version: 'v3.2'
    });
    FB.XFBML.parse();
  }

  loadInstagramWidgets() {
    instgrm.Embeds.process();
  }


}
