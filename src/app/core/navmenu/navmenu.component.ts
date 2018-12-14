import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavmenuService } from 'src/app/services/navmenu.service';

@Component({
  selector: 'news-dashboard-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isCollapsed = true;
  visible = true;

  constructor(private authService: AuthService, public nav: NavmenuService) {}

  ngOnInit() {
    this.nav.visible.subscribe(n => {
      this.visible = n;
    });
  }

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
