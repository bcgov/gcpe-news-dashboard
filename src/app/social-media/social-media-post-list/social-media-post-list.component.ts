import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';

// the following readonly names need to match the names from the social media sdk
declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-post-list',
  templateUrl: './social-media-post-list.component.html',
  styleUrls: ['./social-media-post-list.component.scss']
})
export class SocialMediaPostListComponent implements OnInit, OnDestroy {
  socialmedia: SocialMediaPostExtended[];
  selectedSocialMedia: SocialMediaPostExtended[];

  socialmediatypes: SocialMediaType[];
  filterBy: string = 'All';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      this.socialmediatypes = data['socialmediatype'];
      this.selectedSocialMedia = [];
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams.type === 'All') {
        this.loadNextPosts();
      } else {
        this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === queryParams.type);
        console.log("selectedSocialMedia: " + this.selectedSocialMedia);
        setTimeout(() => { this.loadWidgets(queryParams.type); }, 0);
      }
    });
  }

  loadTwitterWidgets() {
    if (twttr.ready()) {
      twttr.widgets.load();
    }
  }

  loadFacebookWidgets() {
    // remove the fb-post class from the posts that have already been rendered so they don't flicker when we parse/render the next one
    var fbPosts = document.getElementsByClassName("fb-post");
    for (var i = fbPosts.length - 1; i >= 0; i--) {
      fbPosts[i].className = fbPosts[i].className.replace("fb-post ", "");
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

  loadNextPosts() {
    if (this.selectedSocialMedia.length != 0) {
      this.loadWidgets(this.socialmedia[this.selectedSocialMedia.length - 1].mediaType);
    }
    if (this.selectedSocialMedia.length == this.socialmedia.length) return;

    var mediaTypeToLoad = this.socialmedia[this.selectedSocialMedia.length].mediaType;

    while (this.selectedSocialMedia.length < this.socialmedia.length) {
      var postToLoad = this.socialmedia[this.selectedSocialMedia.length];
      if (postToLoad.mediaType != mediaTypeToLoad) break;
      this.selectedSocialMedia.push(postToLoad);
    }

    console.log("selectedSocialMedia: " + this.selectedSocialMedia);
    setTimeout(() => { this.loadNextPosts() }, 250); // to give a head start for fetching the post from FB, Twitter or Instagram
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

  ngOnDestroy() {
    // console.log('destroy');
  }
}
