import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { SocialMediaType } from './shared/social-media-type';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'BC Gov News';
  hideSocialMediaFilter = false;
  socialmediatypes: SocialMediaType[];
  filterBySocialMediaType: string = 'All';

  constructor(private oauthService: OAuthService, private router: Router, private route: ActivatedRoute, private apiService:  ApiService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.apiService.getSocialMediaTypes().subscribe(data => {
      this.socialmediatypes = data;
      console.log(this.socialmediatypes);
    });

    // Only display the social media filter dropdown when social media link is active
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if ( event.url.indexOf('/social-media') > -1 ) {
          this.hideSocialMediaFilter = false;
        }  else {
          this.hideSocialMediaFilter = true;  
        }
      }
    });
  }

  updateSocialMediaType(newType: string) {
    this.filterBySocialMediaType = newType;
  }
}
