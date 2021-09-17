import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { Router, ActivatedRoute } from '@angular/router';

const SocialMediaListDivName = 'new-social-media-list';

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

  constructor(private socialMediaRenderService: SocialMediaRenderService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      this.socialmediatypes = data['socialmediatype'];
    });
    console.log(this.socialmedia);

    this.activatedRoute.queryParams.subscribe(() => {
      this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === 'Instagram');
      this.filterBySocialMediaType = 'Instagram';
    });
    console.log('length ' + this.selectedSocialMedia.length);
  }
  ngAfterViewInit() {
    this.selectedSocialMedia.forEach(post => {
      this.socialMediaRenderService.loadWidgetsWithOptions(post.mediaType, false, SocialMediaListDivName);
    });
    this.isLoading = false;
    this.socialMediaRenderService.initFacebook();
    this.socialMediaRenderService.loadTwitterWidgets();
  }

  ngOnDestroy() {
  }


}
