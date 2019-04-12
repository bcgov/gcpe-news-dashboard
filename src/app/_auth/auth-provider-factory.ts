import { AppConfigService } from '../app-config.service';
import { KeycloakService } from './keycloak.service';
import { MsalService } from './msal.service';
import { OAuthService } from 'angular-oauth2-oidc';

export function AuthProviderFactory(appConfig: AppConfigService, oauth: OAuthService) {
  if (appConfig.config.AUTH_TYPE === 'Keycloak') {
    return new KeycloakService(oauth, appConfig);
  } else if (appConfig.config.AUTH_TYPE === 'AzureAD') {
    return new MsalService();
  }
}
