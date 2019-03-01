import { Component, OnInit } from '@angular/core';
import { AlertsService } from './services/alerts.service';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from './configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'BC Gov News';
  private isLoadingUserSubject = new BehaviorSubject<boolean>(true);
  private isLoadingRouteSubject = new BehaviorSubject<boolean>(true);
  public isLoadingUser = this.isLoadingUserSubject.asObservable();
  public isLoadingRoute = this.isLoadingUserSubject.asObservable();

  constructor(private alerts: AlertsService, private router: Router, private auth: AuthService, private conf: Configuration) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.auth.loggedIn.subscribe((loggedIn) => {
      this.isLoadingUserSubject.next(!loggedIn);
    });

    this.isLoadingUser.subscribe((isLoadingUser) => {
      if(!isLoadingUser) {
        this.router.initialNavigation();
      }
    });
  }

  clearAlerts() {
    this.alerts.remove();
  }

  private navigationInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.isLoadingRouteSubject.next(true);
    } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.isLoadingRouteSubject.next(false);
    }
  }

}
