import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../_auth/auth.service';
import { AlertsService } from '../services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private alerts: AlertsService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data.roles;
    const isAccessGranted = this.auth.roleMatch(roles);
    if (!isAccessGranted) {
      this.alerts.showError(`Access Denied - must belong to one of the following roles: [${roles.join(', ')}]`);
    }
    return isAccessGranted;
  }

}
