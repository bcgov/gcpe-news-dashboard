import { AuthService } from './auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { Configuration } from '../configuration';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthService', () => {
  const fakeRoles = ['Administrators', 'Contributors'];
  let oauth: any;
  let getIdentityClaimsSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        UrlHelperService,
        OAuthLogger,
        AuthService,
        { provide: Configuration, useValue: new Configuration({ withCredentials: true, accessToken: ''})},
        OAuthService
      ]
    });
    oauth = TestBed.get(OAuthService);
    spyOn(oauth, 'configure').and.returnValue(true);
    spyOn(oauth, 'setupAutomaticSilentRefresh').and.returnValue(true);
    spyOn(oauth, 'loadDiscoveryDocumentAndTryLogin').and.returnValue(true);
    getIdentityClaimsSpy = spyOn(oauth, 'getIdentityClaims').and.returnValue({user_roles: []});
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be logged in given a valid auth token',
    inject([AuthService], (service: AuthService) => {
      const spy = spyOn(oauth, 'hasValidAccessToken').and.returnValue(true);
      const rvl = service.loggedIn;
      expect(spy).toHaveBeenCalled();
      expect(rvl).toEqual(true);
    }
  ));

  it('should be logged out given a null or invalid token',
    inject([AuthService], (service: AuthService) => {
      const spy = spyOn(oauth, 'hasValidAccessToken').and.returnValue(false);
      const rvl = service.loggedIn;
      expect(rvl).toEqual(false);
      expect(spy).toHaveBeenCalled();
    }
  ));

  it('should pass role match given user has role',
    inject([AuthService], (service: AuthService) => {
      getIdentityClaimsSpy.and.returnValue({user_roles: ['Administrators']});
      spyOnProperty(service, 'loggedIn').and.returnValue(true);
      service.setAuthUser();
      const rvl = service.roleMatch(fakeRoles);
      expect(rvl).toEqual(true);
    }
  ));

  it('should fail role match given user does not have role',
    inject([AuthService], (service: AuthService) => {
      spyOnProperty(service, 'loggedIn').and.returnValue(true);
      service.setAuthUser();
      const rvl = service.roleMatch(fakeRoles);
      expect(rvl).toEqual(false);
    }
  ));

  it('should fail role match given user is not logged in',
    inject([AuthService], (service: AuthService) => {
      getIdentityClaimsSpy.and.returnValue({user_roles: fakeRoles});
      spyOnProperty(service, 'loggedIn').and.returnValue(false);
      service.setAuthUser();
      const rvl = service.roleMatch(fakeRoles);
      expect(rvl).toEqual(false);
    }
  ));
});
