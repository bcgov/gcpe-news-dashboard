import { Injectable, Inject  } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Entry } from '../shared/entry';
import { Post } from '../shared/post';
<<<<<<< HEAD
import { Theme } from '../shared/theme';
import { SocialMedia } from '../shared/social-media';
import { SocialMediaType } from '../shared/social-media-type';
||||||| merged common ancestors
=======
import { Theme } from '../shared/theme';
>>>>>>> db1b0759df81eed41dd3fdd0bec4a9db0030785f

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
    },
    {
      id: 4,
      name: 'YouTube'
    },
    {
      id: 5,
      name: 'LinkedIn'
    },
    {
      id: 6,
      name: 'SoundCloud'
    }
  ];

  constructor(private  httpClient:  HttpClient, @Inject('BASE_API_URL') baseApiUrl: string) {
    this.API_URL = baseApiUrl;
  }

  getEntries(): Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  getThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }
  
  getSocialMedia(): Observable<SocialMedia[]> {
    return this.httpClient.get<SocialMedia[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
  }

  getSocialMediaTypes(): Observable<SocialMediaType[]> {
    return of(this.SocialMediaTypeList);
  }
}
