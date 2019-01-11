import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../view-models/post';
import { Activity } from '../view-models/activity';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { BASE_PATH } from '../variables';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
    ],
    providers: [
      ApiService,
      { provide: BASE_PATH, useValue: environment.apiUrl}
    ],

  }));

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('expects service to fetch data with proper sorting',
  inject([HttpTestingController, ApiService],
    (httpMock: HttpTestingController, service: ApiService) => {
      // We call the service
      service.getPosts().subscribe(data => {
        expect(data.length).toBe(2);
      });
    })
);

  it('should issue a request to get posts',
  async(inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
    http.get<Post[]>(environment.apiUrl + 'api/Posts/Latest/home/default?count=10&api-version=1.0').subscribe();
    backend.expectOne({
      url: environment.apiUrl + 'api/Posts/Latest/home/default?count=10&api-version=1.0',
      method: 'GET'
    });
  })));

  it('should issue a request to get activities',
  async(inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
    http.get<Activity[]>(environment.apiUrl + 'api/Posts/Latest/home/default?count=10&api-version=1.0').subscribe();
    backend.expectOne({
      url: environment.apiUrl + 'api/Posts/Latest/home/default?count=10&api-version=1.0',
      method: 'GET'
    });
  })));
});
