import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { Configuration } from '../configuration';
import { AlertsService } from '../services/alerts.service';

class mockAuth {
    get loggedIn() {
        return null;
    }
}

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

  it('should grant access if logged in', inject([AuthGuard], (guard: AuthGuard) => {
    spyOnProperty(auth, 'loggedIn').and.returnValue(true);
    
    const access = guard.canActivate();

    expect(access).toBeTruthy();
  }));

  it('should grant access if logged out', inject([AuthGuard], (guard: AuthGuard) => {
    spyOnProperty(auth, 'loggedIn').and.returnValue(false);
    const alertSpy = spyOn(TestBed.get(AlertsService), 'showError');
    
    const access = guard.canActivate();

    expect(access).toBeFalsy();
    expect(alertSpy).toHaveBeenCalled();
  }));
});
