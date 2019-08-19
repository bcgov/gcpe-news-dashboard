import { Component, OnInit, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SnowplowService } from '../../services/snowplow.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { BrowserInfoService } from '../../services/browser-info.service';

declare function resizeAllGridItems(divName, hasBorder): any;
const SocialMediaListDivName = 'new-social-media-input-list';

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

  isLoading: boolean = true;

  deleteConfirmationId: string = '';

  private subscription: Subscription;
  private timer: Observable<any>;
  private fbEvents: Observable<any>;
  private resizeListener: any;

  internetExplorer = false;
  isMobile = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socialMediaService: SocialMediaPostsService,
    private socialMediaRenderService: SocialMediaRenderService,
    private alerts: AlertsService,
    private snowplowService: SnowplowService,
    public renderer: Renderer2,
    private browserService: BrowserInfoService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.resizeListener = this.renderer.listen('window', 'resize', (event) => {
      this.setTimer(true);
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
    });
    this.snowplowService.trackPageView();
    this.internetExplorer = this.browserService.getBrowser();
    this.isMobile = this.browserService.isMobile();
    if (this.internetExplorer) {
      this.alerts.cancelable = true;
      this.alerts.showInfo(this.browserService.getIEDisclaimer());
    }
  }

  ngAfterViewInit() {
    this.setTimer(false);
    if (this.isMobile || this.internetExplorer) {
      this.isLoading = false;
    }
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

  close() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['social-media-input']);
  }

  backToSocialMediaList() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['social-media-list']);
  }

  pinSocialMediaPost(post: SocialMediaPostExtended) {
    let newOrder = 0;
    if (post.sortOrder === 0) {
      newOrder = 1;
    } else {
      newOrder = 0;
    }
    this.socialMediaService.updateSocialMediaPost(post.id, { sortOrder: newOrder, url: post.url }).subscribe(
      (res) => {
        this.close();
      },
      (err) => {
        this.alerts.showError('Failed to pin post');
      }
    );
  }

  confirmDeleteSocialMediaPost(post: SocialMediaPostExtended) {
    if ((post.id !== 'undefined') && (post.id !== null)) {
      this.socialMediaService.deleteSocialMediaPost(post.id).subscribe(
        () => {
          this.close();
        },
        (err) => {
          this.alerts.showError('Failed to delete post');
        }
      );
    }
  }

  deleteSocialMediaPost(post: SocialMediaPostExtended) {
    this.deleteConfirmationId = post.id;
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
    if (this.socialmedia !== undefined) {
      this.socialmedia.forEach(post => {
        if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
          selectedSocialmediatypes.push(post.mediaType);
          this.socialMediaRenderService.loadWidgetsWithOptions(post.mediaType, true, SocialMediaListDivName);
        }
      });
    }

    this.timer = Observable.timer(5000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
      resizeAllGridItems(SocialMediaListDivName, true);
      this.isLoading = false;
      this.socialMediaRenderService.toggleTwitterPosts(true);
      this.socialMediaRenderService.toggleIframePosts(SocialMediaListDivName, true);
    });
  }
}
