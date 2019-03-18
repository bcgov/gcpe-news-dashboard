import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { authConfig } from '../auth.config';
import { AlertsService } from './alerts.service';
import { Configuration } from '../configuration';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsalService {
  private msal: UserAgentApplication;
  public accessTokenSubject = new BehaviorSubject<string>('');
  public accessToken = this.accessTokenSubject.asObservable();
  public isRefreshingToken = false;

  constructor(private alerts: AlertsService, private configuration: Configuration) {
    const url = `${window.location.protocol}//${window.location.hostname + (window.location.port ? ':' + window.location.port : '')}`;
    this.msal = new UserAgentApplication(authConfig.clientID, authConfig.authority, (errorDesc, token, error) => {
      this.configuration.accessToken = token;
    }, {
      validateAuthority: authConfig.validateAuthority,
      redirectUri: url,
      navigateToLoginRequestUrl: false,
      storeAuthStateInCookie: /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
    });
  }

  public login() {
    this.msal.loginRedirect([authConfig.clientID]);
  }

  public getUser() {
    const user = this.msal.getUser();
    return user ? user : null;
  }

  public logout() {
    this.msal.logout();
  }

  public tryLogin() {
    if (this.msal.getUser()) {
      this.getToken();
    } else {
      this.login();
    }
  }

  public getToken() {
    this.isRefreshingToken = true;
    this.msal.acquireTokenSilent([authConfig.clientID])
      .then(accessToken => {
        this.isRefreshingToken = false;
        this.accessTokenSubject.next(accessToken);
      }, error => {
          this.isRefreshingToken = false;
          this.alerts.showError('Failed to authenticate');
          this.accessTokenSubject.next('');
      });
  }
}
