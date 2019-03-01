import { BehaviorSubject } from "rxjs";
import { User } from "../view-models/user";

export class mockAuth {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();
  getLoggedIn() {
      return null;
  }
  roleMatch(roles) {}
}
