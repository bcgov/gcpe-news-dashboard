import { Injectable } from '@angular/core';
import { SocialMediaPostViewModel } from '../view-models/social-media-post';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SocialMediaPostsService } from '../services/socialMediaPosts.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SociaMediaPostListResolver implements Resolve<SocialMediaPostViewModel[]> {
    constructor(private socialMediaPostsService: SocialMediaPostsService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SocialMediaPostViewModel[]> {
        return this.socialMediaPostsService.getAllSocialMediaPosts()
        .pipe(
            map(res => res.map(item => ( new SocialMediaPostViewModel(item)))),
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        )
    }
  
}