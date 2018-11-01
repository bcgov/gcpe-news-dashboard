import { Injectable } from '@angular/core';
import { Entry } from '../shared/entry';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EntryListResolver implements Resolve<Entry[]> {
    constructor(private entryService: ApiService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Entry[]> {
        return this.entryService.getEntries()
        .pipe(
            catchError(error => {
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}