import { AuthService } from './auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { Configuration } from '../configuration';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MsalService } from './msal.service';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let msal: any;
  let msalTrySpy: any;
  let accessTokenObs: BehaviorSubject<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        AuthService,
        { provide: Configuration, useValue: new Configuration({ withCredentials: true, accessToken: ''})},
        MsalService
      ]
    });
    msal = TestBed.get(MsalService);
    accessTokenObs = new BehaviorSubject('');
    spyOn(msal, 'accessToken').and.returnValue(accessTokenObs);
    msalTrySpy = spyOn(msal, 'tryLogin').and.returnValue(Promise.resolve('eybToken'));
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should set user values given a valid user', (done) => {
    inject([AuthService], (service: AuthService) => {
      spyOn(service, 'parseExpiry').and.returnValue(500);
      service.currentUser.subscribe((user) => {
        if (typeof user.name !== 'undefined') {
          expect(user.access_token).toBe('eybToken');
          expect(user.user_roles).toEqual(['Contributor']);
          expect(user.name).toBe('Test');
          expect(user.expiry).toBe(500 * 1000);
          done();
        }
      });
      const spy = spyOn(msal, 'getUser').and.returnValue({'idToken': {'roles': ['Contributor']}, 'displayableId': 'Test'});
      service.setUser('eybToken');
      expect(spy).toHaveBeenCalled();
    })();
  });

  it('should set user values given a valid user', (done) => {
    inject([AuthService], (service: AuthService) => {
      service.currentUser.subscribe((user) => {
        if (typeof user.name !== 'undefined') {
          expect(user.access_token).toBe('eybToken');
          expect(user.user_roles).toEqual(['Contributor']);
          expect(user.name).toBe('Test');
          done();
        }
      });
      const spy = spyOn(msal, 'getUser').and.returnValue({'idToken': {'roles': ['Contributor']}, 'displayableId': 'Test'});
      service.setUser('eybToken');
      expect(spy).toHaveBeenCalled();
    })();
  });

  it('should pass role match given user has role', (done) => {
    inject([AuthService], (service: AuthService) => {
      service.currentUser.subscribe((user) => {
        if (typeof user.name !== 'undefined') {
          const rvl = service.roleMatch(['Contributor']);
          expect(rvl).toBeTruthy();
          done();
        }
      });
      spyOn(msal, 'getUser').and.returnValue({'idToken': {'roles': ['Contributor']}, 'displayableId': 'Test'});
      service.setUser('eybToken');
    })();
  });

  it('should fail role match given user does not have role',
    inject([AuthService], (service: AuthService) => {
      spyOn(msal, 'getUser').and.returnValue({'idToken': {'roles': []}, 'displayableId': 'Test'});
      service.setUser('eybToken!');
      const rvl = service.roleMatch(['Contributor']);
      expect(rvl).toBeFalsy();
    }
  ));

  it('should fail role match given user is not logged in',
    inject([AuthService], (service: AuthService) => {
      const rvl = service.roleMatch(['Contributor']);
      expect(rvl).toBeFalsy();
    }
  ));
});
