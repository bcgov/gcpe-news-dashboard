import { Component, OnInit } from '@angular/core';
import { Post } from '../../view-models/post';
import { SocialMediaType } from '../../view-models/social-media-type';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { UtilsService } from 'src/app/services/utils.service';

declare const FB: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {
  public userMinistriesForFilteringPosts: Array<string> = [];
  public posts: Post[] = [];
  public selectedPosts: Post[] = [];
  private BASE_NEWS_URL: string;
  filterBySocialMediaType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appConfig: AppConfigService,
    private alerts: AlertsService,
    private utils: UtilsService) {
    this.BASE_NEWS_URL = this.appConfig.config.NEWS_URL;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (typeof data['posts'] === 'undefined' || data['posts'] === null) {
        this.alerts.showError('An error occurred while retrieving posts');
        return;
      }
      let hasFacebookAssets = false;
      data['posts'].forEach(p => {
        if (p.assetUrl.indexOf('facebook') >= 0) {
          (<any>p).fbAssetClass = SocialMediaType.getFacebookClass(p.assetUrl);
          hasFacebookAssets = true;
        }
      });
      this.posts = data['posts'];
      if (hasFacebookAssets) {
        FB.init({
          xfbml: true,
          version: 'v3.2'
        });
        FB.XFBML.parse();
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
<<<<<<< HEAD
              return this.utils.includes(this.userMinistriesForFilteringPosts, p.leadMinistryKey)
                || p.ministries && this.utils.intersection(this.userMinistriesForFilteringPosts, p.ministries).length > 0;
=======
              return this.userMinistriesForFilteringPosts.includes(p.leadMinistryKey)
                || this.userMinistriesForFilteringPosts.some(m => p.ministries.includes(m));
>>>>>>> d54ad084b6abc5e22614721d14801615ea7c1450
            });
        }
        this.filterBySocialMediaType = queryParams.type;
      });
    });
  }
}
