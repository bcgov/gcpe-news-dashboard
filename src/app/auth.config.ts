var origin = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port : '');

export const authConfig = {
  clientID: "974b09f9-8093-476b-a795-9e6b4e317f6b",
  authority: "https://login.microsoftonline.com/bcgov.onmicrosoft.com/",
  validateAuthority: true,
  redirectUri: origin,
  cacheLocation: "localStorage",
  postLogoutRedirectUri: origin,
  navigateToLoginRequestUrl: true
};
