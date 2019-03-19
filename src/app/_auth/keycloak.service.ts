import { Injectable } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { keycloakConfig } from '../auth.config';
import { AuthProvider } from './auth-provider.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService extends AuthProvider {
  public accessTokenSubject = new BehaviorSubject<string>('');
  public accessToken = this.accessTokenSubject.asObservable();
  public isRefreshingToken = false;

  constructor(private oauth: OAuthService) {
    super();
    keycloakConfig.redirectUri = window.location.protocol + '//' + window.location.hostname
                                + (window.location.port ? ':' + window.location.port : '');
    keycloakConfig.silentRefreshRedirectUri = keycloakConfig.redirectUri + '/keycloak-silent-refresh.html';

    this.oauth.configure(keycloakConfig);
    this.oauth.tokenValidationHandler = new JwksValidationHandler();
    this.oauth.setupAutomaticSilentRefresh();
    this.oauth.loadDiscoveryDocumentAndTryLogin();

    this.oauth.events.subscribe(e => {
      switch (e.type) {
        case 'token_received':
          this.accessTokenSubject.next(this.oauth.getAccessToken());
          break;
      }
    });
    this.accessTokenSubject.next(this.oauth.getAccessToken());
  }

  tryLogin() {
    this.login();
  }

  login() {
    this.oauth.initImplicitFlow();
  }

  logout() {
    this.oauth.logOut();
  }

  refreshToken() {
    return null;
  }

  getUser() {
    const identityClaims = this.oauth.getIdentityClaims();
    if (identityClaims === null) {
      return null;
    }
    const user = {
      user_roles: identityClaims['user_roles'] || [],
      access_token: this.accessTokenSubject.value,
      name: identityClaims['name'] || '',
      expiry: identityClaims['expiry'] || ''
    };
    return user;
  }

}
