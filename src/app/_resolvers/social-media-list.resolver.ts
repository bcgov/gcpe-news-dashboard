import { Injectable } from '@angular/core';
import { SocialMedia } from '../view-models/social-media';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SociaMediaListResolver implements Resolve<SocialMedia[]> {
    constructor(private apiService: ApiService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SocialMedia[]> {
        return this.apiService.getSocialMediaPosts()
        .pipe(
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}