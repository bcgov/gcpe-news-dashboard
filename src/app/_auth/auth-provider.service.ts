import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../view-models/user';

@Injectable()
export class AuthProvider {
  public accessToken: Observable<string>;
  public redirectUrl: string;
  constructor() {
    this.redirectUrl = `${window.location.protocol}//${window.location.hostname + (window.location.port ? ':' + window.location.port : '')}`;
  }
  tryLogin() {}
  logout() {}
  getUser(): User | null { return null; }
  refreshToken() {}
}
