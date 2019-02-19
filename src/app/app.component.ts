import { Component, OnInit } from '@angular/core';
import { AlertsService } from './services/alerts.service';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'BC Gov News';
  isLoading: boolean = true;

  constructor(private alerts: AlertsService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  ngOnInit() {
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
