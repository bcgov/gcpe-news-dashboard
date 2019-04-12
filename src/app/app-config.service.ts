import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './backup.config';

@Injectable()
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) { }

  async loadAppConfig() {
    return this.http.get('/assets/config/appConfig.json')
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
