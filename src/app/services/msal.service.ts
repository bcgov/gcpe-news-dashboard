import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { authConfig } from '../auth.config';
import { AlertsService } from './alerts.service';
import { Configuration } from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class MsalService {
  msal: UserAgentApplication;

  constructor(private alerts: AlertsService, private configuration: Configuration) {
    const url = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port : '');
    this.msal = new UserAgentApplication(authConfig.clientID, authConfig.authority, (errorDesc, token, error) => {
      this.configuration.accessToken = token;
    }, {
      validateAuthority: authConfig.validateAuthority,
      redirectUri: url,
      navigateToLoginRequestUrl: false
    });
  }

  public async login() {
    this.msal.loginRedirect([authConfig.clientID]);
  }

  public getUser() {
    const user = this.msal.getUser();
    return user ? user : null;
  }

  public logout() {
    this.msal.logout();
  }

  public async tryLogin() {
    if(this.msal.getUser()) {
      return this.getToken();
    } else {
      return this.login();
    }
  }

  public async getToken(): Promise<string> {
    return this.msal.acquireTokenSilent([authConfig.clientID])
      .then(accessToken => {
        return accessToken;
      }, error => {
        return this.msal.acquireTokenSilent([authConfig.clientID])
          .then(accessToken => {
            return accessToken;
          }, error => {
            this.alerts.showError('Failed to authenticate');
            return '';
          });
      });
  }
}
