import { Injectable } from '@angular/core';
import { Configuration } from '../configuration';
import { BehaviorSubject } from 'rxjs';
import { User } from '../view-models/user';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();
  public loggedIn = false;

  constructor(private configuration: Configuration, private msal: MsalService) {}

  tryLogin() {
    if(!this.loggedIn) {
      this.login();
    }
  }

  logoutUser() {
    this.loggedIn = false;
  }

  loginUser(token: string) {
    this.loggedIn = true;
    this.setUser(token);
  }

  setUser(token: string) {
    this.configuration.accessToken = token;
    const identityClaims = this.msal.getUser();
    let user = {
      user_roles: identityClaims['idToken']['roles'] || [],
      access_token: token,
      name: identityClaims['displayableId'] || ''
    } as User;
    this.currentUserSubject.next(user);
  }

  login() {
    this.msal.loginRedirect(['']);
  }

  logOut() {
    this.msal.logout();
  }

  roleMatch(allowedRoles: Array<String>): boolean {
    if (!this.loggedIn) {
      return false;
    }
    return allowedRoles.some(r => this.currentUserSubject.value.user_roles.indexOf(r) >= 0);
  }
}
