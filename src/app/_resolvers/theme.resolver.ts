import { Injectable } from '@angular/core';
import { Theme } from '../view-models/theme';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ThemesService } from '../services/themes.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ThemeResolver implements Resolve<Theme> {
    constructor(private themesService: ThemesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Theme> {
        return this.themesService.get(route.params.id)
        .pipe(
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}