import { Injectable } from '@angular/core';
import { Message } from '../view-models/message';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessageResolver implements Resolve<Message> {
    constructor(private messagesService: MessagesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Message> {
        return this.messagesService.getMessage(route.params.id)
        .pipe(
            catchError(error => {
                return of(null);
            })
        );
    }
}
