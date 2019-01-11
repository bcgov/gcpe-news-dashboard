import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

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
        this.appConfig = {
            "API_URL": environment.apiUrl
        }
      });
  }

  get config() {
    return this.appConfig;
  }
}