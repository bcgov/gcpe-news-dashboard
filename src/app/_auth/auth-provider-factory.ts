import { AppConfigService } from '../app-config.service';
import { KeycloakService } from './keycloak.service';
import { MsalService } from './msal.service';
import { OAuthService } from 'angular-oauth2-oidc';

export function AuthProviderFactory(appConfig: AppConfigService, oauth: OAuthService) {
  if (appConfig.config.AUTH_TYPE === 'keycloak') {
    return new KeycloakService(oauth);
  } else if (appConfig.config.AUTH_TYPE === 'azure') {
    return new MsalService();
  }
}
