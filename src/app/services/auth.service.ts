import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {}

  login() {
    this.oauthService.initImplicitFlow(); // redirection is configured in the app component
  }

  logOut() { this.oauthService.logOut(); }

  loggedIn() {
    const token = this.oauthService.getAccessToken();
    return !!token;
  }

  get identityClaims() { return this.oauthService.getIdentityClaims() || {}; }

  get userMinistry() {
    let ministry = '';

    const displayName = this.oauthService.getIdentityClaims()['display_name'];
    if (displayName) {
      ministry = displayName.split(' ')[2];
    }

    return ministry;
  }

  roleMatch(allowedRoles: Array<String>): boolean {
    const userRoles = this.identityClaims['user_roles']  as Array<String> || [];
    return allowedRoles.some(r => userRoles.indexOf(r) >= 0);
  }
}
