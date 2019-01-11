import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavmenuService } from 'src/app/services/navmenu.service';

@Component({
  // tslint:disable-next-line:component-selector
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

  getFirstLetter() {
    return this.authService.identityClaims ? this.authService.identityClaims['name'][0] : 'A';
  }

  getColor(letter: string) {
    const num = letter.charCodeAt(0) - 65;
    return 'hsla(' + 360 / 25 * num + ', 75%, 50%, 0.7)';
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
