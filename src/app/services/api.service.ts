import { Injectable, Inject  } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activity } from '../view-models/activity';
import { Post } from '../view-models/news/post';
import { SocialMedia } from '../view-models/social-media';
import { SocialMediaType } from '../view-models/social-media-type';
import { BASE_PATH } from '../variables';
import { resolve } from 'q';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = '';
  NEWS_API_URL = '';

  // mock data for the media types
  private SocialMediaTypeList: SocialMediaType[] = [
    {
        id: 1,
        name: 'Facebook'
    },
    {
        id: 2,
        name: 'Twitter'
    },
    {
      id: 3,
      name: 'Instagram'
    }
  ];

  private SocialMediaList: SocialMedia[] = [
    {
        id: '1',
        mediatype: 'Facebook',
        url: 'https://www.facebook.com/BCProvincialGovernment/posts/2456078591077085',
    },
    {
        id: '2',
        mediatype: 'Twitter',
        url: 'https://twitter.com/Interior/status/463440424141459456',
    },
    {
      id: '3',
      mediatype: 'Instagram',
      url:'https://www.instagram.com/p/Bqs5nnBBQRc/',
    },
    {
      id: '4',
      mediatype: 'Instagram',
      url:'https://www.instagram.com/p/BrBSPuMBHDn/',
    },
    {
      id: '5',
      mediatype: 'Facebook',
      url: 'https://www.facebook.com/BCProvincialGovernment/posts/2447373845280893',
    },
    {
      id: '6',
      mediatype: 'Twitter',
      url: 'https://twitter.com/BCGovNews/status/1072287955014877184',
    },
  ];

  constructor(private httpClient: HttpClient, @Inject(BASE_PATH) baseApiUrl: string, @Inject('BASE_NEWS_API_URL') baseNewsApiUrl: string) {
    this.API_URL = baseApiUrl;
    this.NEWS_API_URL = baseNewsApiUrl;
  }

  // get the activities for 7 days forecast
  getActivityForecast(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.NEWS_API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  // get the last 7 days post
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.NEWS_API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  // get the social media list
  getSocialMediaPosts(): Observable<SocialMedia[]> {
    /*
    return this.httpClient.get<SocialMedia[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
    */
   this.SocialMediaList.forEach(function (item, i, list) {
    if (item.url.search('facebook.com') >= 0) {
      item.mediatype = 'Facebook';
    }
    else if (item.url.search('twitter.com') >= 0) {
      item.mediatype = 'Twitter';
    }
    else {
      item.mediatype = 'Instagram';
    }
  });
   return of(this.SocialMediaList);
  }

  // get the social media type list, used in the filter
  getSocialMediaTypes(): Observable<SocialMediaType[]> {
    return of(this.SocialMediaTypeList);
  }

}
