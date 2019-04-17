import { Component, OnInit } from '@angular/core';
import { Post } from '../../view-models/post';
import { SocialMediaType } from '../../view-models/social-media-type';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from 'src/app/services/utils.service';
import { MinistriesProvider } from 'src/app/_providers/ministries.provider';

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
    private utils: UtilsService,
    private ministriesProvider: MinistriesProvider,
    private sanitizer: DomSanitizer) {
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
      let hasYoutubeAssets = false;
      data['posts'].forEach(p => {
        if (p.assetUrl.indexOf('facebook') >= 0) {
          (<any>p).fbAssetClass = SocialMediaType.getFacebookClass(p.assetUrl);
          hasFacebookAssets = true;
        }
        if (p.assetUrl.indexOf('youtube') >= 0) {
          (<any>p).youtubeId = this.extractVideoID(p.assetUrl);
          hasYoutubeAssets = true;
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
}
