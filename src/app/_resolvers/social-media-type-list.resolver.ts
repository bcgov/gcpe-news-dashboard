import { Injectable } from '@angular/core';
import { SocialMediaType } from '../view-models/social-media-type';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SociaMediaTypeListResolver implements Resolve<SocialMediaType[]> {
    constructor(private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SocialMediaType[]> {
        return of(SocialMediaType.SocialMediaTypeList)
        .pipe(
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
