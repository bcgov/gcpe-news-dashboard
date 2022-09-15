import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';

const SocialMediaListDivName = 'new-social-media-list';
declare const window: any;
@Component({
  selector: 'app-social-media-page-view',
  templateUrl: './social-media-page-view.component.html',
  styleUrls: ['./social-media-page-view.component.scss']
})
export class SocialMediaPageViewComponent implements OnInit, AfterViewInit, OnDestroy {

  socialmedia: SocialMediaPostExtended[];
  selectedSocialMedia: SocialMediaPostExtended[];

  socialmediatypes: SocialMediaType[];
  filterBySocialMediaType: string;

  isLoading = true;
  private resizeListener: any;
  private subscription: Subscription;
  private timer: Observable<any>;
  private fbEvents: Observable<any>;

  constructor(private socialMediaRenderService: SocialMediaRenderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public renderer: Renderer2) {
      this.resizeListener = this.renderer.listen('window', 'resize', (event) => {
        window.location.reload();
      });
    }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      this.socialmediatypes = data['socialmediatype'];
    });

    this.activatedRoute.queryParams.subscribe(() => {
      this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === 'Instagram');
      this.filterBySocialMediaType = 'Instagram';
    });
    this.socialMediaRenderService.initFacebook();
  }
  ngAfterViewInit() {
    this.timer = timer(1000);
    this.subscription = this.timer.subscribe(() => {
      this.socialMediaRenderService.loadTwitterWidgets();
      this.socialMediaRenderService.loadFacebookTimeline();
      this.selectedSocialMedia.forEach(post => {
        this.socialMediaRenderService.loadWidgetsWithOptions(post.mediaType, false, SocialMediaListDivName);
      });
      this.isLoading = false;
    });
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

  }



