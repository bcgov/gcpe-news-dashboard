import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertsService } from '../services/alerts.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private alerts: AlertsService) {}

    canActivate(): boolean {
        if (!this.authService.loggedIn) {
            this.alerts.showError('Access Denied - Must be logged in');
        }
        return this.authService.loggedIn;
    }
}
