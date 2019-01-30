import { Injectable } from '@angular/core';
import { Activity } from '../view-models/activity';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ActivityListResolver implements Resolve<Activity[]> {
    constructor(private activityService: ApiService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Activity[]> {
      return this.activityService.getActivityForecast()
        .pipe(
            catchError(error => {
                return of(null);
            })
        );
    }
}
