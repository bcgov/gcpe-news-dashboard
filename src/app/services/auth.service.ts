import { Injectable } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { Configuration } from '../configuration';
import { authConfig } from '../auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService, private configuration: Configuration) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events.subscribe(e => {
      switch (e.type) {
        case 'token_received':
          this.configureAccessToken();
          break;
      }
    });
    this.configureAccessToken();
  }

  configureAccessToken() {
    this.configuration.accessToken = this.accessToken;
  }

  get accessToken() { return this.oauthService.getAccessToken(); }
  get loggedIn() { return this.oauthService.hasValidAccessToken(); }
  get identityClaims() { return this.oauthService.getIdentityClaims() || {}; }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logOut() {
    this.oauthService.logOut();
  }

  roleMatch(allowedRoles: Array<String>): boolean {
    if (!this.loggedIn) {
      return false;
    }
    const userRoles = this.identityClaims['user_roles']  as Array<String> || [];
    return allowedRoles.some(r => userRoles.includes(r));
  }
}
