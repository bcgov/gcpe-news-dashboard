import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from  '@angular/common/http';

import { Theme } from '../view-models/theme';
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  HUB_API_URL = '';

  constructor(private httpClient: HttpClient, @Inject('BASE_HUB_API_URL') baseHubApiUrl: string) {
    this.HUB_API_URL = baseHubApiUrl;
  }

  getAll(isPublished: Boolean = true): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.HUB_API_URL}api/Messages?IsPublished=${isPublished}`)
    .pipe(
      catchError(this.handleErrors)
    );
  }

  get(id: string): Observable<Theme> {
    return this.httpClient.get<Theme>(`${this.HUB_API_URL}api/Messages/${id}`)
    .pipe(
      catchError(this.handleErrors)
    );
  }

  create(theme: Theme) {
    return this.httpClient.post(
      `${this.HUB_API_URL}api/messages`,
      JSON.stringify({
        ...theme
      }),
      { headers: this.getCommonHeaders() }
    ).pipe(
      catchError(this.handleErrors)
    );
  }

  update(id: string, theme: Theme) {
    return this.httpClient.put(
      `${this.HUB_API_URL}api/messages/${id}`,
      JSON.stringify({
        ...theme
      }),
      { headers: this.getCommonHeaders() }
    ).pipe(
      catchError(this.handleErrors)
    );
  }

  getCommonHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}
