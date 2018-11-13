import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  OAuthService,
  JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'BC Gov News';

  constructor(private oauthService: OAuthService, private router: Router, private route: ActivatedRoute) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
