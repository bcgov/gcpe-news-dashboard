import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './backup.config';

@Injectable()
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) { }

  async loadAppConfig() {
    let hostname = window.location.href;
    let env = '';
    if (hostname.toString().includes('dev')) {
      env = 'dev';
      return this.http.get('/assets/config/appConfig.dev.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      })
      .catch(data => {
        this.appConfig = config;
      });
    } else if (hostname.toString().includes('test')) {
      env = 'test';
      return this.http.get('/assets/config/appConfig.test.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      })
      .catch(data => {
        this.appConfig = config;
      });
    } else {
      env = 'prod';
    }
    return this.http.get('/assets/config/appConfig.prod.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      })
      .catch(data => {
        this.appConfig = config;
      });
  }

  get config() {
    return this.appConfig;
  }
}
