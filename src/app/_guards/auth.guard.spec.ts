import { AuthGuard } from './auth.guard';
import { AuthService } from '../_auth/auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { Configuration } from '../configuration';
import { AlertsService } from '../services/alerts.service';
import { mockAuth } from '../test-helpers/mock-auth';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let auth: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          { provide: Configuration, useValue: new Configuration({ withCredentials: true, accessToken: '' })},
          { provide: AuthService, useClass: mockAuth },
          AlertsService
        ]
    });
    auth = TestBed.get(AuthService);
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should grant access if logged in', (done) => {
    inject([AuthGuard], (guard: AuthGuard) => {
      spyOn(auth, 'isLoggedIn').and.returnValue(of(true));

      const access = guard.canActivate();

      access.subscribe(val => {
        expect(val).toBeTruthy();
        done();
      });
    })();
  });

  it('should not grant access if logged out', (done) => {
    inject([AuthGuard], (guard: AuthGuard) => {
      spyOn(auth, 'isLoggedIn').and.returnValue(of(false));

      const access = guard.canActivate();

      access.subscribe(val => {
        expect(val).toBeFalsy();
        done();
      });
    })();
  });
});
