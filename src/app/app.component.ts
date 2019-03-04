import { Component, OnInit } from '@angular/core';
import { AlertsService } from './services/alerts.service';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { BroadcastService } from '@azure/msal-angular';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'BC Gov News';
  isLoading: boolean = true;
  private subscription: Subscription;

  constructor(private alerts: AlertsService, private router: Router, private broadcast: BroadcastService, private auth: AuthService) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.broadcast.subscribe("msal:loginFailure", (payload) => {
      this.auth.logoutUser()
    });

    this.broadcast.subscribe("msal:loginSuccess", (payload) => {
      this.auth.loginUser(payload.token);
    });

    this.auth.tryLogin();
  }

  ngOnDestroy() {
    this.broadcast.getMSALSubject().next(1);
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearAlerts() {
    this.alerts.remove();
  }

  private navigationInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.isLoading = false;
    }
  }

}
