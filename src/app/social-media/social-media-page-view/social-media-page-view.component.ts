import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { Router, ActivatedRoute } from '@angular/router';

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
  }
  ngAfterViewInit() {
    this.socialMediaRenderService.loadFacebookTimeline();
    this.socialMediaRenderService.loadTwitterWidgets();
    this.selectedSocialMedia.forEach(post => {
      this.socialMediaRenderService.loadWidgetsWithOptions(post.mediaType, false, SocialMediaListDivName);
    });
    this.isLoading = false;
  }

  ngOnDestroy() {
  }

  }



