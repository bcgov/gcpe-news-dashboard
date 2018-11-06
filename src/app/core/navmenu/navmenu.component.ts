import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'news-dashboard-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isCollapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  login() {
    this.authService.login();
  }

  logOut() {
    this.authService.logOut();
  }
}
