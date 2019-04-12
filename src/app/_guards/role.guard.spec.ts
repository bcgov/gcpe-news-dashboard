import { RoleGuard } from './role.guard';
import { AuthService } from '../_auth/auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { Configuration } from '../configuration';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertsService } from '../services/alerts.service';

describe('RoleGuard', () => {
  let auth: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          { provide: Configuration, useValue: new Configuration({ withCredentials: true, accessToken: '' })},
          { provide: AuthService, useValue: { roleMatch: () => {}} },
          { provide: Router, useValue: {} },
          AlertsService
        ]
    });
    auth = TestBed.get(AuthService);
  });

  it('should be created', inject([RoleGuard], (guard: RoleGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should grant access if role matches', inject([RoleGuard], (guard: RoleGuard) => {
    let route = new ActivatedRouteSnapshot();
    route.data = { roles: ['Contributor'] };
    spyOn(auth, 'roleMatch').and.returnValue(true);

    const access = guard.canActivate(route);

    expect(access).toBeTruthy();
  }));

  it('should deny access if role doesnt match', inject([RoleGuard], (guard: RoleGuard) => {
    let route = new ActivatedRouteSnapshot();
    route.data = { roles: ['Contributor'] };
    spyOn(auth, 'roleMatch').and.returnValue(false);
    const alertSpy = spyOn(TestBed.get(AlertsService), 'showError');

    const access = guard.canActivate(route);

    expect(access).toBeFalsy();
    expect(alertSpy).toHaveBeenCalled();
  }));
});
