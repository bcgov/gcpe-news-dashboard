import { Injectable } from '@angular/core';
import { SocialMediaPostViewModel } from '../view-models/social-media-post';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SocialMediaPostsService } from '../services/socialMediaPosts.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SociaMediaPostListResolver implements Resolve<SocialMediaPostViewModel[]> {
    constructor(private apiService: SocialMediaPostsService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SocialMediaPostViewModel[]> {
        return this.apiService.getAllSocialMediaPosts()
        .pipe(
            map(res => res.map(item => ({
                id: item.id,
                url: item.url,
                sortOrder: item.sortOrder,
                mediaType: this.getMediaType(item.url),
            } as SocialMediaPostViewModel))),
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        )
    }

    getMediaType(url:string): string{
        let type: string;
        type = '';
        if (url.indexOf('facebook')>=0)
        {
            type = 'Facebook';
        }
        else if (url.indexOf('twitter')>=0)
        {
            type = 'Twitter';
        }
        else if (url.indexOf('instagram') >=0)
        {
            type = 'Instagram';
        }
        return type;
    }
    
}