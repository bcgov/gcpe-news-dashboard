import { Injectable } from '@angular/core';
import { Activity } from '../view-models/activity';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivitiesService } from '../services/activities.service';

@Injectable()
export class ActivityListResolver implements Resolve<Activity[]> {
    constructor(private activityService: ActivitiesService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Activity[]> {
      return this.activityService.getActivityForecast(7)
        .pipe(
            catchError(error => {
                return of(null);
            })
        );
    }
}
