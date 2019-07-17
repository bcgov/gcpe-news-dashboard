import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { SnowplowService } from '../../services/snowplow.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { BrowserInfoService } from '../../services/browser-info.service';
import { AlertsService } from 'src/app/services/alerts.service';

declare function resizeAllGridItems(divname, hasBorder): any;
const SocialMediaListDivName = 'new-social-media-list';

@Component({
  selector: 'app-social-media-post-list',
  templateUrl: './social-media-post-list.component.html',
  styleUrls: ['./social-media-post-list.component.scss']
})

export class SocialMediaPostListComponent implements OnInit, AfterViewInit, OnDestroy {
  socialmedia: SocialMediaPostExtended[];
  selectedSocialMedia: SocialMediaPostExtended[];

  socialmediatypes: SocialMediaType[];
  filterBySocialMediaType: string;

  isLoading = true;

  private subscription: Subscription;
  private timer: Observable<any>;
  private fbEvents: Observable<any>;
  private resizeListener: any;

  internetExplorer = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socialMediaRenderService: SocialMediaRenderService,
    private snowplowService: SnowplowService,
    public renderer: Renderer2,
    private browserService: BrowserInfoService,
    private alerts: AlertsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.internetExplorer = this.browserService.getBrowser();
    if (!this.internetExplorer) {
      this.resizeListener = this.renderer.listen('window', 'resize', (event) => {
        this.setTimer(true);
      });
    }
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      this.socialmediatypes = data['socialmediatype'];
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (!queryParams.type || queryParams.type === 'All') {
        this.selectedSocialMedia = this.socialmedia;
      } else {
        this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === queryParams.type);
      }
      this.filterBySocialMediaType = queryParams.type;
    });
    this.snowplowService.trackPageView();
    if (this.internetExplorer) {
      this.alerts.cancelable = true;
      this.alerts.showInfo(this.browserService.getIEDisclaimer());
    }
  }

  ngAfterViewInit() {
    this.setTimer(false);
  }

  ngOnDestroy() {
    this.resizeListener();
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
    if ( this.fbEvents && this.fbEvents instanceof Subscription) {
      this.fbEvents.unsubscribe();
    }
  }

  setTimer(isResize: boolean) {
    this.isLoading = true;
    if (!this.internetExplorer) {
      if (isResize) {
        this.socialMediaRenderService.toggleTwitterPosts(false);
      } else {
        this.socialMediaRenderService.HideTwitterPostsAfterLoaded();
      }
    }

    const selectedSocialmediatypes = [];
    if (this.selectedSocialMedia !== undefined) {
      this.selectedSocialMedia.forEach(post => {
        if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
          selectedSocialmediatypes.push(post.mediaType);
          this.socialMediaRenderService.loadWidgetsWithOptions(post.mediaType, true, SocialMediaListDivName);
        }
      });
    }

    this.timer = Observable.timer(5000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
      resizeAllGridItems(SocialMediaListDivName, false);
      this.isLoading = false;
      this.socialMediaRenderService.toggleTwitterPosts(true);
      this.socialMediaRenderService.toggleIframePosts(SocialMediaListDivName, true);
    });
  }
}
