import { Component, OnInit } from '@angular/core';
import { AlertsService } from './services/alerts.service';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './_auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from './configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'BC Gov News';
  public isLoading = new BehaviorSubject<boolean>(true);

  constructor(private alerts: AlertsService, private router: Router, private auth: AuthService, private conf: Configuration) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.auth.isLoggingInSubject.subscribe((isLoggingIn) => {
      if (!isLoggingIn) {
        this.router.initialNavigation();
      }
    });
  }

  clearAlerts() {
    this.alerts.remove();
  }

  private navigationInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.isLoading.next(true);
    } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.isLoading.next(false);
    }
  }

}
