import { Injectable } from '@angular/core';
import { Message } from '../view-models/message';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ThemeListByAdminResolver implements Resolve<Message[]> {
  constructor(private messagesService: MessagesService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
      let isPublished = route.queryParams['type'].toLowerCase() !== 'drafts';
        return this.messagesService.getAllMessages(isPublished)
        .pipe(
            catchError(error => {
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
