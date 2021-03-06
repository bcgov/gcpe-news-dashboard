import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserPreferencesService } from '../services/userPreferences.service';

@Injectable()
export class UserMinistryListResolver implements Resolve<Observable<Array<string>>> {
    constructor(private userPreferencesService: UserPreferencesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Array<string>> {
        return this.userPreferencesService.getUserMinistryPreferences()
            .pipe(
                catchError(error => {
                    return of(null);
            })
        );
    }
}
