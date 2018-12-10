import { Injectable } from '@angular/core';
import { Theme } from '../view-models/theme';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ThemeListResolver implements Resolve<Theme[]> {
    constructor(private themeService: ApiService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Theme[]> {
        return this.themeService.getThemes()
        .pipe(
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}