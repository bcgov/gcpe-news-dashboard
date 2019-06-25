import { Component, Renderer2 , OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Post } from '../view-models/post';
import { SocialMediaType } from '../view-models/social-media-type';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from 'src/app/services/utils.service';
import { MinistriesProvider } from 'src/app/_providers/ministries.provider';
import { SnowplowService } from '../services/snowplow.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { SocialMediaRenderService } from '../services/socialMediaRender.service';
import { ControlContainer } from '@angular/forms';

declare const FB: any;
declare function resizeAllGridItems(): any;

@Component({
  selector: 'app-post-new-layout',
  templateUrl: './post-new-layout.component.html',
  styleUrls: ['./post-new-layout.component.scss']
})
export class PostNewLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public userMinistriesForFilteringPosts: Array<string> = [];
  public posts: Post[] = [];
  public selectedPosts: Post[] = [];
  private BASE_NEWS_URL: string;
  filterBySocialMediaType: string;
  hasFacebookAssets = true;
  resizeListener: any;

  private subscription: Subscription;
  private timer: Observable<any>;

  isLoading: boolean = true;
  isFbPostsDone = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appConfig: AppConfigService,
    private alerts: AlertsService,
    private utils: UtilsService,
    private ministriesProvider: MinistriesProvider,
    private sanitizer: DomSanitizer,
    private snowplowService: SnowplowService,
    public renderer: Renderer2,
    private socialMediaRenderService: SocialMediaRenderService,
    ) {
      this.BASE_NEWS_URL = this.appConfig.config.NEWS_URL;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.resizeListener = this.renderer.listen('window', 'resize', (event) => {
        this.setTimer();
        console.log('resize');
      });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (typeof data['posts'] === 'undefined' || data['posts'] === null) {
        this.alerts.showError('An error occurred while retrieving posts');
        return;
      }
      this.hasFacebookAssets = false;
      let hasYoutubeAssets = false;
      data['posts'].forEach(p => {
        if (p.assetUrl.indexOf('facebook') >= 0) {
          (<any>p).fbAssetClass = SocialMediaType.getFacebookClass(p.assetUrl);
          this.hasFacebookAssets = true;
        }
        if (p.assetUrl.indexOf('youtube') >= 0) {
          (<any>p).youtubeId = this.extractVideoID(p.assetUrl);
          hasYoutubeAssets = true;
        }
      });
      this.posts = data['posts'];
      if (this.hasFacebookAssets) {
        FB.init({
          xfbml: true,
          version: 'v3.2'
        });
        //FB.XFBML.parse(document.getElementById('new-post-list'));
      FB.Event.subscribe('xfbml.render', function(msg) {
        const posts = document.getElementById('new-post-list').getElementsByTagName('iframe');
        //console.log(posts);
        Array.from(posts).forEach(function(item) {
          setTimeout(function() {
            item.style.visibility = 'hidden';
          }, 100);
       });

      });
      }
      if (typeof data['userMinistries'] === 'undefined' || data['userMinistries'] === null) {
        this.alerts.showError('An error occurred while retrieving your ministries');
        return;
      }

      this.userMinistriesForFilteringPosts = data['userMinistries'];

      this.route.queryParams.subscribe((queryParams: any) => {
        if (!queryParams.ministries || queryParams.ministries === 'All') {
          this.selectedPosts = this.posts;
        } else {
            this.selectedPosts = this.posts.filter(p => {

              const postMinistries: Array<string> = [];
              p.ministries.forEach((val, idx, arr) => {
                postMinistries.push(this.ministriesProvider.getMinistry(val).key);
              });

              return this.utils.includes(this.userMinistriesForFilteringPosts, p.leadMinistryKey)
                || this.utils.intersection(this.userMinistriesForFilteringPosts, postMinistries).length > 0;
            });
        }
        this.filterBySocialMediaType = queryParams.type;
      });
    });
    this.snowplowService.trackPageView();
  }

  ngAfterViewInit() {
    this.setTimer();
  }

  ngOnDestroy() {
    this.resizeListener();
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  extractVideoID( url: string ): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    if ( match && match[7].length === 11 ) {
        return match[7];
    } else {
        return '';
    }
  }

  videoURL( item: any ) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.youtubeId);
  }

  displayFacebookPost() {
    const posts = document.getElementById('new-post-list').getElementsByTagName('iframe');
        Array.from(posts).forEach(function(item) {
          setTimeout(function() {
            item.style.visibility = 'visible';
          }, 100);
       });
  }

  setTimer() {

    if (this.hasFacebookAssets) {
      // this.socialMediaRenderService.loadFacebookWidgetsForNode('new-post-list');
      /*
      FB.XFBML.parse(document.getElementById('new-post-list'), function onRenderComplete(event) {
        console.log('facebook parse done!', event);
        this.isFbPostsDone = true;
      });*/

      const facebookPosts: HTMLCollectionOf<Element> = document.getElementById('new-post-list').getElementsByClassName('facebook-post');
      Array.from(facebookPosts).forEach(function(item) {
        FB.XFBML.parse(item);
      });
    }

    this.timer = Observable.timer(2000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
      this.isLoading = false;
      if (this.hasFacebookAssets) {
        this.displayFacebookPost();
      }
      resizeAllGridItems();
    });

  }
}
