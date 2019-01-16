import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { NavmenuService } from '../../services/navmenu.service';

// the following readonly names need to match the names from the social media sdk
declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-input',
  templateUrl: './social-media-input.component.html',
  styleUrls: ['./social-media-input.component.scss']
})

export class SocialMediaInputComponent implements OnInit, AfterViewInit, OnDestroy {
  socialmedia: SocialMediaPostExtended[];
  selectedSocialMedia: SocialMediaPostExtended[];

  socialmediatypes: SocialMediaType[];
  filterBySocialMediaType: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public nav: NavmenuService,) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.nav.hide();
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
    });
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

  ngAfterViewInit() {
    const selectedSocialmediatypes = [];

    this.socialmedia.forEach(post => {
      if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
        selectedSocialmediatypes.push(post.mediaType);
        this.loadWidgets(post.mediaType);
      }
    });
  }

  ngOnDestroy() {
    // console.log('destroy');
  }
}
