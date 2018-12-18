import { Injectable, Inject  } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activity } from '../view-models/activity';
import { Post } from '../view-models/post';
import { SocialMedia } from '../view-models/social-media';
import { SocialMediaType } from '../view-models/social-media-type';
import { BASE_PATH } from '../variables';

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

  constructor(private httpClient: HttpClient, @Inject(BASE_PATH) baseApiUrl: string) {
    this.API_URL = baseApiUrl;
  }

  // get the activities for 7 days forecast
  getActivityForecast(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.API_URL}/api/Activities/Forecast/47?api-version=1.0`)
    .pipe();
  }

  // get the last 7 days post
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL}/api/Posts/Latest/47?api-version=1.0`)
    .pipe();
  }
  
  // get the social media list
  getSocialMediaPosts(): Observable<SocialMedia[]> {
    return this.httpClient.get<SocialMedia[]>(`${this.API_URL}/api/Posts/Latest/47?api-version=1.0`)
    .pipe();
  }

  // get the social media type list, used in the filter
  getSocialMediaTypes(): Observable<SocialMediaType[]> {
    return of(this.SocialMediaTypeList);
  }
}
