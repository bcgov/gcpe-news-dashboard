import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private socialMediaRenderService: SocialMediaRenderService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
  }

  ngAfterViewInit() {
    let selectedSocialmediatypes = [];
    if (this.selectedSocialMedia !== undefined) {
      this.selectedSocialMedia.forEach(post => {
        if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
          selectedSocialmediatypes.push(post.mediaType);
          this.socialMediaRenderService.loadWidgets(post.mediaType);
        }
      });
    }
  }

  ngOnDestroy() {
    // console.log('destroy');
  }
}
