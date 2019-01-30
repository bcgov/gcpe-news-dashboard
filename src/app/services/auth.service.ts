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
          this.configuration.apiKeys['Authorization'] = this.oauthService.getAccessToken();
          break;
      }
    });
  }

  get loggedIn() { return this.oauthService.hasValidAccessToken(); }
  get identityClaims() { return this.oauthService.getIdentityClaims() || {}; }

  login() {
    this.oauthService.initImplicitFlow(); // redirection is configured in the app component
  }

  logOut() {
    this.oauthService.logOut();
  }

  roleMatch(allowedRoles: Array<String>): boolean {
    const userRoles = this.identityClaims['user_roles']  as Array<String> || [];
    return allowedRoles.some(r => userRoles.indexOf(r) >= 0);
  }
}
