import { Injectable, Inject  } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Entry } from '../view-models/entry';
import { Post } from '../view-models/news/post';
import { Theme } from '../view-models/theme';
import { SocialMedia } from '../view-models/social-media';
import { SocialMediaType } from '../view-models/social-media-type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  '';
  HUB_API_URL = '';

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
  ];

  constructor(private  httpClient:  HttpClient, @Inject('BASE_API_URL') baseApiUrl: string, @Inject('BASE_HUB_API_URL') baseHubApiUrl: string) {
    this.API_URL = baseApiUrl;
    this.HUB_API_URL = baseHubApiUrl;
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
    return this.httpClient.get<Theme[]>(`${this.HUB_API_URL}/api/Messages?IsPublished=true`)
    .pipe();
  }

  // get the theme list by logged user
  getThemesManagement(isPublished: Boolean): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.HUB_API_URL}/api/Messages?IsPublished=${isPublished}`)
    .pipe();
  }
  
  // get the social media list
  getSocialMediaPosts(): Observable<SocialMedia[]> {
    /*
    return this.httpClient.get<SocialMedia[]>(`${this.API_URL}/api/Posts/Latest/home/default?count=10&api-version=1.0`)
    .pipe();
    */
   return of(this.SocialMediaList);
  }

  // get the social media type list, used in the filter
  getSocialMediaTypes(): Observable<SocialMediaType[]> {
    return of(this.SocialMediaTypeList);
  }
}
