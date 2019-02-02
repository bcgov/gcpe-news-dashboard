import { Injectable } from '@angular/core';
import { Post } from '../view-models/post';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PostListResolver implements Resolve<Post[]> {
    constructor(private entryService: ApiService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        return this.entryService.getPosts()
        .pipe(
            catchError(error => {
                return of(null);
            })
        );
    }
}
