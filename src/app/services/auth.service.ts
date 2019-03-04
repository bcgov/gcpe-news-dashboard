import { Injectable } from '@angular/core';
import { Configuration } from '../configuration';
import { BehaviorSubject } from 'rxjs';
import { User } from '../view-models/user';
import { MsalService } from './msal.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  public currentUser = this.currentUserSubject.asObservable();
  public loggedIn = this.loggedInSubject.asObservable();

  private refreshingToken: boolean = false;

  constructor(private configuration: Configuration, private msal: MsalService) {
    this.login();
  }

  checkExpired() {
    const token = <string>this.configuration.accessToken;
    let expiry = 0;
    try {
      expiry = JSON.parse(window.atob(token.split('.')[1])).exp;
    } catch {}
    if(this.msal.getUser() !== null && new Date().getTime()/1000 >= expiry && !this.refreshingToken) {
      this.refreshingToken = true;
      this.msal.getToken().then(token => {
        this.refreshingToken = false;
        this.setUser(token);
      });
    }
  }

  getLoggedIn(): boolean {
    this.checkExpired();
    return this.loggedInSubject.value;
  }

  logout() {
    this.msal.logout();
    this.loggedInSubject.next(false);
  }

  async login(): Promise<boolean> {
    return this.msal.tryLogin().then(token => {
      this.setUser(<string>token);
      this.loggedInSubject.next(true);
      return true;
    });
  }

  async setUser(token: string) {
    this.configuration.accessToken = token;
    const identityClaims = this.msal.getUser();
    let user = {
      user_roles: identityClaims['idToken']['roles'] || [],
      access_token: token,
      name: identityClaims['displayableId'] || ''
    } as User;
    this.currentUserSubject.next(user);
  }

  public roleMatch(allowedRoles: Array<String>): boolean {
    if(typeof this.currentUserSubject.value.user_roles === 'undefined') {
      return false;
    }
    return allowedRoles.some(r => this.currentUserSubject.value.user_roles.indexOf(r) >= 0);
  }
}
