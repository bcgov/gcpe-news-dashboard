import { AuthService } from './auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';

describe('AuthService', () => {
  const fakeToken = {};
  const fakeRoles = ['Administrators'];
  const fakeRoleWithoutUsers = ['Foo'];

  beforeEach(() => {
     TestBed.configureTestingModule({
       providers: [
        AuthService,
        {provide: OAuthService, useValue: {
          getIdentityClaims: () => ['Administrators']
        }}
       ]
     });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return true given a valid auth token',
    inject([AuthService], (service: AuthService) => {
    const spy = spyOn(service, 'loggedIn').and.returnValue(!!fakeToken);
    const rvl = service.loggedIn();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(rvl).toEqual(true);
  }));

  it('should return false given a null or invalid token',
    inject([AuthService], (service: AuthService) => {
    const spy = spyOn(service, 'loggedIn').and.returnValue(!!null);
    const rvl = service.loggedIn();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(rvl).toEqual(false);
  }));

  it('should return true given that a user has the required role to access a feature of the app',
    inject([AuthService], (service: AuthService) => {
    const spy = spyOn(service, 'roleMatch').and.returnValue(true);
    spyOn(service, 'identityClaims').and.returnValue(fakeRoles);
    const rvl = service.roleMatch(fakeRoles);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(fakeRoles);
    expect(rvl).toEqual(true);
  }));

  it('should return false given that a user does not have the required role to access a feature of the app',
    inject([AuthService], (service: AuthService) => {
    const spy = spyOn(service, 'roleMatch').and.returnValue(false);
    spyOn(service, 'identityClaims').and.returnValue(fakeRoleWithoutUsers);
    const rvl = service.roleMatch(fakeRoleWithoutUsers);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(fakeRoleWithoutUsers);
    expect(rvl).toEqual(false);
  }));
});
