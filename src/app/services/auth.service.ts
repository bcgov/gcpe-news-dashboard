import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) { }

  login() {
    this.oauthService.initImplicitFlow(); // redirection is configured in the app component
  }

  logOut() { this.oauthService.logOut(); }

  loggedIn() {
    const token = this.oauthService.getAccessToken();
    return !!token;
  }

  get identityClaims() { return this.oauthService.getIdentityClaims(); }

}
