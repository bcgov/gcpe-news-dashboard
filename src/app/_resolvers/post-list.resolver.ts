import { Injectable } from '@angular/core';
import { Post } from '../view-models/post';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';

@Injectable()
export class PostListResolver implements Resolve<Post[]> {
    constructor(private postsService: PostsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        return this.postsService.getLatestPosts(7)
        .pipe(
            catchError(error => {
                return of(null);
            })
        );
    }
}
