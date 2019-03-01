import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AccountSettingsService } from '../services/account-settings.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserMinistryListResolver implements Resolve<Observable<Array<string>>> {
    constructor(private accountSettingsService: AccountSettingsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Array<string>> {
        return this.accountSettingsService.getUserMinistries()
            .pipe(
                catchError(error => {
                    this.router.navigate(['/']);
                    return of(null);
            })
        );
    }
}
