import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { NavmenuService } from '../../services/navmenu.service';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { AlertsService } from 'src/app/services/alerts.service';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public nav: NavmenuService,
    private socialMediaService: SocialMediaPostsService,
    private socialMediaRenderService: SocialMediaRenderService,
    private alerts: AlertsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.nav.hide();
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
    });
  }

  ngAfterViewInit() {
    const selectedSocialmediatypes = [];
    if (this.socialmedia !== null || this.socialmedia.length > 0) {
      this.socialmedia.forEach(post => {
        if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
          selectedSocialmediatypes.push(post.mediaType);
          this.socialMediaRenderService.loadWidgets(post.mediaType);
        }
      });
    }

    // Social media embeds don't have events to hook into.. about 1.8 seconds seems to be the sweet spot
    setTimeout(() => {
      this.isLoading = false;
    }, 1800);
  }

  ngOnDestroy() {
    this.nav.show();
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
}
