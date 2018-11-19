import { Injectable } from '@angular/core';
import { SocialMediaType } from '../shared/social-media-type';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SociaMediaTypeListResolver implements Resolve<SocialMediaType[]> {
    constructor(private apiService: ApiService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SocialMediaType[]> {
        return this.apiService.getSocialMediaTypes()
        .pipe(
            catchError(error => {
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}