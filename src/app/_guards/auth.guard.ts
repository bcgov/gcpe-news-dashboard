import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot): boolean {
        const roles = next.data['roles'] as Array<string>;
        if (roles) {
            const match = this.authService.roleMatch(roles);
            if (match) {
                return true;
            } else {
                this.router.navigate(['last-7-day-post-list']);
            }
        }

        if (this.authService.loggedIn()) {
            return true;
        }

        this.router.navigate(['last-7-day-post-list']);
        return false;
    }
}
