import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_auth/auth.service';
import { AlertsService } from '../services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private alerts: AlertsService, private router: Router) {
    this.authService.currentUser.subscribe((user) => {
      if(user.user_roles.length < 1) {
        this.alerts.showError('You do not have the proper role to view this application', false);
      } else {
        this.router.navigate(['/last-7-day-post-list']);
      }
    });
  }

  ngOnInit() {
  }

}
