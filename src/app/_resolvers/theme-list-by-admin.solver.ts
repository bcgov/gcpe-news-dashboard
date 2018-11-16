import { Injectable } from '@angular/core';
import { Theme } from '../shared/theme';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ThemeListByAdminResolver implements Resolve<Theme[]> {
    constructor(private themeService: ApiService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Theme[]> {
        return this.themeService.getThemesManagement()
        .pipe(
            catchError(error => {
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}