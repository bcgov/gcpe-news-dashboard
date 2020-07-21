import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { azureADConfig } from '../auth.config';
import { BehaviorSubject } from 'rxjs';
import { AuthProvider } from './auth-provider.service';

@Injectable({
  providedIn: 'root'
})
export class MsalService extends AuthProvider {
  private msal: UserAgentApplication;
  public accessTokenSubject = new BehaviorSubject<string>('');
  public accessToken = this.accessTokenSubject.asObservable();
  public isRefreshingToken = false;

  constructor() {
    super();
    this.msal = new UserAgentApplication(
      {
        auth: {
          clientId: azureADConfig.clientID, validateAuthority: azureADConfig.validateAuthority,
          redirectUri: this.redirectUrl,
        },
      });
  }

  public login() {
    this.msal.loginRedirect({ scopes: [azureADConfig.clientID] });
  }

  public getUser() {
    const msalUser = this.msal.getAccount();
    if (msalUser === null) {
      return null;
    }
    const user = {
      user_roles: msalUser.idToken['roles'] || [],
      access_token: this.accessTokenSubject.value,
      name: msalUser.idToken['name'].split(', ')[1] || '',
      expiry: msalUser.idToken['exp'] || ''
    };
    return user;
  }

  public logout() {
    this.msal.logout();
  }

  public tryLogin() {
    if (this.msal.getAccount()) {
      this.getToken();
    } else {
      this.login();
    }
  }

  public getToken() {
    this.isRefreshingToken = true;
    this.msal.acquireTokenSilent({ scopes: [azureADConfig.clientID] })
      .then(authResponse => {
        this.isRefreshingToken = false;
        this.accessTokenSubject.next(authResponse.accessToken);
      }, error => {
        this.isRefreshingToken = false;
        this.accessTokenSubject.next('');
      });
  }
}
