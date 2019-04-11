import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../configuration';
import { BASE_PATH } from '../variables';
import { Ministry } from '../view-models/ministry';

@Injectable()
export class MinistriesProvider {

  protected basePath = 'https://localhost';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  private ministries: Ministry[] = [];

  constructor(private http: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  public getMinistries(): Ministry[] {
    return this.ministries;
  }

  public getMinistry(id: string): Ministry {
    return this.ministries.find(m => m.id === id);
  }

  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get<Array<Ministry>>(`${this.basePath}/api/ministries`)
        .subscribe(response => {
          this.ministries = response;
          resolve(true);
        });
    });
  }
}
