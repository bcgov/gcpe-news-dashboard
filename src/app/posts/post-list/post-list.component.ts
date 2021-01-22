import { Component, Renderer2, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../view-models/post';
import { SocialMediaType } from '../../view-models/social-media-type';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from 'src/app/services/utils.service';
import { MinistriesProvider } from 'src/app/_providers/ministries.provider';
import { SnowplowService } from '../../services/snowplow.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { BrowserInfoService } from '../../services/browser-info.service';

declare function resizeAllGridItems(divName, hasBorder): any;
const PostListDivId = 'new-post-list';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, AfterViewInit, OnDestroy {
  public userMinistriesForFilteringPosts: Array<string> = [];
  public posts: Post[] = [];
  public selectedPosts: Post[] = [];
  private BASE_NEWS_URL: string;
  filterBySocialMediaType: string;
  hasFacebookAssets = true;
  private resizeListener: any;

  private subscription: Subscription;
  private timer: Observable<any>;
  private fbEvents: Observable<any>;

  isLoading = true;
  internetExplorer = false;
  isMobile = false;

  constructor(
    private cdr: ChangeDetectorRef,
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
    private browserService: BrowserInfoService) {
    this.BASE_NEWS_URL = this.appConfig.config.NEWS_URL;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.resizeListener = this.renderer.listen('window', 'resize', (event) => {
      this.setTimer();
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (typeof data['posts'] === 'undefined' || data['posts'] === null) {
        this.alerts.showError('An error occurred while retrieving posts');
        return;
      }
      let hasFacebookAssets = false;
      let hasYoutubeAssets = false;
      data['posts'].forEach(p => {
        if (p.assetUrl.indexOf('facebook') >= 0) {
          (<any>p).fbAssetClass = SocialMediaType.getFacebookClass(p.assetUrl);
          hasFacebookAssets = true;
        }
        if (p.assetUrl.indexOf('youtube') >= 0) {
          (<any>p).youtubeId = this.extractVideoID(p.assetUrl);
          hasYoutubeAssets = true;
          p.assetUrl = this.videoURL(p);
        }
      });
      this.posts = data['posts'];
      if (this.hasFacebookAssets) {
        this.socialMediaRenderService.initFacebook();
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
    this.internetExplorer = this.browserService.getBrowser();
    this.isMobile = this.browserService.isMobile();
    this.snowplowService.trackPageView();
    if (this.internetExplorer) {
      this.alerts.cancelable = true;
      this.alerts.showInfo(this.browserService.getIEDisclaimer());
    }
  }

  ngAfterViewInit() {
    if (this.selectedPosts.length > 0 && !this.isMobile && !this.internetExplorer) {
      this.setTimer();
    }
    if (this.isMobile || this.internetExplorer || this.selectedPosts.length === 0) {
      this.isLoading = false;
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.resizeListener();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.fbEvents && this.fbEvents instanceof Subscription) {
      this.fbEvents.unsubscribe();
    }
  }

  extractVideoID(url: string): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      return '';
    }
  }

  videoURL(item: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.youtubeId);
  }

  public toggleFacebookPosts(visible: boolean) {
    const posts = document.getElementById(PostListDivId).getElementsByTagName('iframe');
    Array.from(posts).forEach(function (item) {
      setTimeout(function () {
        item.style.visibility = visible ? 'visible' : 'hidden';
      }, 100);
    });
  }

  setTimer() {
    this.isLoading = true;
    const post_list = document.getElementById(PostListDivId);
    if (post_list) { post_list.style.visibility = 'hidden'; }
    if (this.hasFacebookAssets) {
      this.socialMediaRenderService.loadFacebookWidgesbyNodeId(PostListDivId, true);
    }

    this.timer = timer(4000); // 4000 millisecond means 4 seconds
    this.subscription = this.timer.subscribe(() => {
      resizeAllGridItems(PostListDivId, true);
      this.isLoading = false;
      if (post_list) {
        post_list.style.visibility = 'visible';
        if (this.hasFacebookAssets) {
          this.socialMediaRenderService.toggleIframePosts(PostListDivId, true);
          //this.toggleFacebookPosts(true);
        }
      }
    });
  }
}
