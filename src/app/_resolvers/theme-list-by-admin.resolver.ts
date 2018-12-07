import { Injectable } from '@angular/core';
import { Theme } from '../view-models/theme';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ThemeListByAdminResolver implements Resolve<Theme[]> {
    constructor(private themeService: ApiService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Theme[]> {
        let isPublished = route.queryParams['type'].toLowerCase() !== 'drafts';
        return this.themeService.getThemesManagement(isPublished)
        .pipe(
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}