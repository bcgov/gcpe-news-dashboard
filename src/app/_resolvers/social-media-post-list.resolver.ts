import { Injectable } from '@angular/core';
import { SocialMediaPostExtended } from '../view-models/social-media-post-extended';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SocialMediaPostsService } from '../services/socialMediaPosts.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SociaMediaPostListResolver implements Resolve<SocialMediaPostExtended[]> {
    constructor(private socialMediaPostsService: SocialMediaPostsService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SocialMediaPostExtended[]> {
        return this.socialMediaPostsService.getAllSocialMediaPosts()
        .pipe(
            map(res => res.map(item => ( new SocialMediaPostExtended(item)))),
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        )
    }
}
