import { Injectable, OnDestroy } from '@angular/core';
import { Configuration } from '../configuration';
import { BehaviorSubject, Subscription, Observable, of } from 'rxjs';
import { User } from '../view-models/user';
import { delay } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { AuthProvider } from './auth-provider.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  subscriptions = new Subscription();

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();

  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggingInSubject = new BehaviorSubject<boolean>(false);

  constructor(private configuration: Configuration, private appConfig: AppConfigService, private authProvider: AuthProvider) {
    if (window.location.href.indexOf('id_token') > 0) {
      this.isLoggingInSubject.next(true);
    } else {
      this.login();
    }
    this.subscriptions.add(this.authProvider.accessToken.subscribe((token) => {
      if (token !== '' && token !== null) {
        this.setUser(token);
        this.isLoggedInSubject.next(true);
        this.isLoggingInSubject.next(false);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
  * Converts an access token into it's expiry time in seconds
  * @param token A valid token
  * Returns 0 if an invalid token is received
  */
  parseExpiry(token: string) {
    try {
      return JSON.parse(window.atob(token.split('.')[1])).exp;
    } catch {
      return 0;
    }
  }

  /**
  * Returns an observable of whether the user is logged in or not
  */
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /**
  * Logs out any logged in user
  */
  logout() {
    this.authProvider.logout();
    this.isLoggedInSubject.next(false);
  }

  /**
   * Logs in user via provider
   */
  login() {
    this.isLoggingInSubject.next(true);
    this.authProvider.tryLogin();
  }

  setUser(token: string) {
    this.configuration.accessToken = token;
    const user = this.authProvider.getUser();
    this.subscriptions.add(of(null).pipe(delay(new Date(<number>user.expiry))).subscribe(() => {
      this.authProvider.refreshToken();
    }));
    this.currentUserSubject.next(user);
  }

  public roleMatch(allowedRoles: Array<String>): boolean {
    if (typeof this.currentUserSubject.value.user_roles === 'undefined') {
      return false;
    }
    return allowedRoles.some(r => this.currentUserSubject.value.user_roles.indexOf(r) >= 0);
  }
}
