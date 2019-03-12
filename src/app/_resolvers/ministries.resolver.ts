import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Ministry } from '../view-models/ministry';
import { MinistriesService } from '../services/ministries.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MinsitriesResolver implements Resolve<Ministry[]> {
    constructor(private ministriesService: MinistriesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Ministry[]> {
      return this.ministriesService.getAllMinistries()
        .pipe(
          catchError(error => {
            this.router.navigate(['/']);
            return of(null);
          })
        );
    }
}
