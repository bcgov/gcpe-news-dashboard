import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { authConfig } from '../auth.config';
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
    this.msal = new UserAgentApplication(authConfig.clientID, authConfig.authority, (errorDesc, token, error) => {

    }, {
      validateAuthority: authConfig.validateAuthority,
      redirectUri: this.redirectUrl,
      navigateToLoginRequestUrl: false,
      storeAuthStateInCookie: /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
    });
  }

  public login() {
    this.msal.loginRedirect([authConfig.clientID]);
  }

  public getUser() {
    const msalUser = this.msal.getUser();
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
          this.accessTokenSubject.next('');
      });
  }
}
