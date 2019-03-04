import { AuthService } from './auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { Configuration } from '../configuration';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BroadcastService, MsalService } from '@azure/msal-angular';

class fakeMsal {
  getUser() {}
  loginRedirect() {}
  logout() {}
  login () {}
}

describe('AuthService', () => {
  let msal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        AuthService,
        { provide: Configuration, useValue: new Configuration({ withCredentials: true, accessToken: ''})},
        BroadcastService,
        { provide: MsalService, useClass: fakeMsal }
      ]
    });
    msal = TestBed.get(MsalService);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should set user values given a valid user', (done) => {
    inject([AuthService], (service: AuthService) => {
      service.currentUser.subscribe((user) => {
        if(typeof user.name !== 'undefined') {
          expect(user.access_token).toBe('token!');
          expect(user.user_roles).toEqual(['Contributor']);
          expect(user.name).toBe('Test');
          done();
        }
      });
      const spy = spyOn(msal, 'getUser').and.returnValue({'idToken': {'roles': ['Contributor']}, 'displayableId': 'Test'});
      service.setUser('token!');
      expect(spy).toHaveBeenCalled();
    })();
  });

  it('should try login if not logged in', inject([AuthService], (service: AuthService) => {
    service.loggedIn = false;
    const spy = spyOn(service, 'login');
    service.tryLogin();
    expect(spy).toHaveBeenCalled();
  }));

  it('should not try login if logged in', inject([AuthService], (service: AuthService) => {
    service.loggedIn = true;
    const spy = spyOn(service, 'login');
    service.tryLogin();
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should pass role match given user has role', (done) => {
    inject([AuthService], (service: AuthService) => {
      service.currentUser.subscribe((user) => {
        if(typeof user.name !== 'undefined') {
          const rvl = service.roleMatch(['Contributor']);
          expect(rvl).toBeTruthy();
          done();
        }
      });
      spyOn(msal, 'getUser').and.returnValue({'idToken': {'roles': ['Contributor']}, 'displayableId': 'Test'});
      service.loginUser('token!');
    })();
  });

  it('should fail role match given user does not have role',
    inject([AuthService], (service: AuthService) => {
      spyOn(msal, 'getUser').and.returnValue({'idToken': {'roles': []}, 'displayableId': 'Test'});
      service.loginUser('token!');
      const rvl = service.roleMatch(['Contributor']);
      expect(rvl).toBeFalsy();
    }
  ));

  it('should fail role match given user is not logged in',
    inject([AuthService], (service: AuthService) => {
      service.loggedIn = false;
      const rvl = service.roleMatch(['Contributor']);
      expect(rvl).toBeFalsy();
    }
  ));
});
