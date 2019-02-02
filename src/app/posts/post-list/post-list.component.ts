import { Component, OnInit } from '@angular/core';
import { Post } from '../../view-models/post';
import { SocialMediaType } from '../../view-models/social-media-type';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { AlertsService } from 'src/app/services/alerts.service';

declare const FB: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {
  public posts: Post[] = [];
  private BASE_NEWS_URL: string;

  constructor(private route: ActivatedRoute, private appConfig: AppConfigService, private alerts: AlertsService) {
    this.BASE_NEWS_URL = appConfig.config.NEWS_URL;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if(typeof data['posts'] === 'undefined' || data['posts'] === null) {
        this.alerts.showError('An error occurred while retrieving posts');
        return;
      };
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
    });
  }
}
