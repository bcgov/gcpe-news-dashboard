import { Injectable, Inject  } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activity } from '../view-models/activity';
import { Post } from '../view-models/post';
import { SocialMediaType } from '../view-models/social-media-type';
import { BASE_PATH } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = '';
  NEWS_API_URL = '';

  constructor(private httpClient: HttpClient, @Inject(BASE_PATH) baseApiUrl: string) {
    this.API_URL = baseApiUrl;
  }

  // get the activities for 7 days forecast
  getActivityForecast(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.API_URL}/api/Activities/Forecast/7`)
    .pipe();
  }

  // get the last 7 days post
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL}/api/Posts/Latest/7`)
    .pipe();
  }

  // get the social media type list, used in the filter
  getSocialMediaTypes(): Observable<SocialMediaType[]> {
    return of(SocialMediaType.SocialMediaTypeList);
  }
}
