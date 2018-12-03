import { Injectable, Inject  } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Entry } from '../shared/entry';
import { Post } from '../shared/post';
import { Theme } from '../shared/theme';
import { SocialMedia } from '../shared/social-media';
import { SocialMediaType } from '../shared/social-media-type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  '';

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

  constructor(private  httpClient:  HttpClient, @Inject('BASE_API_URL') baseApiUrl: string) {
    this.API_URL = baseApiUrl;
  }

  // get the entries for 7 days forecast
  getEntries(): Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  // get the last 7 days post
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  // get the themes of the week
  getThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  // get the theme list by logged user
  getThemesManagement(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }
  
  // get the social media list
  getSocialMediaPosts(): Observable<SocialMedia[]> {
    return this.httpClient.get<SocialMedia[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  // get the social media type list, used in the filter
  getSocialMediaTypes(): Observable<SocialMediaType[]> {
    return of(this.SocialMediaTypeList);
  }
}
