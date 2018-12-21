import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
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
export class SocialMediaPostListComponent implements OnInit, AfterViewInit, OnDestroy {
  socialmedia: SocialMediaPostExtended[];
  selectedSocialMedia: SocialMediaPostExtended[];

  socialmediatypes: SocialMediaType[];
  filterBy: string = 'All';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private socialMediaService: SocialMediaPostsService) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.init();
    this.loadInstagramWidgets();
    this.loadTwitterWidgets();
    this.loadFacebookWidgets();
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      this.socialmediatypes = data['socialmediatype'];
      console.log(this.socialmedia);
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams.type === 'All') {
        this.selectedSocialMedia = this.socialmedia;
      } else {
        this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === queryParams.type);
      }

    });
    console.log(this.selectedSocialMedia);
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
    FB.Event.subscribe('xfbml.ready', function (msg) {
      FB.XFBML.parse();
    });

  }

  loadInstagramWidgets() {
    instgrm.Embeds.process();
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(val => {
      this.activatedRoute.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
          this.loadInstagramWidgets();
          this.loadTwitterWidgets();
          this.loadFacebookWidgets();
        } else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === queryParams.type);
          switch (queryParams.type) {
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
      });
    });
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
