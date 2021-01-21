export const keycloakConfig = {
  issuer: '',
  issuerPath: 'gov.bc.ca/auth/realms/zdw7o87p',
  clientId: 'news-dashboard',
  scope: 'openid profile email',
  requireHttps: false,
  redirectUri: '',
  silentRefreshRedirectUri: ''
};

export const azureADConfig = {
  clientID: '974b09f9-8093-476b-a795-9e6b4e317f6b',
  authority: 'https://login.microsoftonline.com/bcgov.onmicrosoft.com/',
  validateAuthority: true,
  cacheLocation: 'localStorage',
  navigateToLoginRequestUrl: true
};
