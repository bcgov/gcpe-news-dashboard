import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_auth/auth.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'news-dashboard-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isCollapsed = true;
  visible = true;
  firstLetter: String = 'A';
  isLoggedIn: boolean|Observable<boolean>;

  constructor(private authService: AuthService, public nav: NavmenuService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
    this.nav.visible.subscribe(n => {
      this.visible = n;
    });
    this.authService.currentUser.subscribe((user) => {
      const name = user.name || '';
      this.firstLetter = name[0];
    });
  }

  getColor(letter: string) {
    const num = letter.charCodeAt(0) - 65;
    return 'hsla(' + 360 / 25 * num + ', 75%, 50%, 0.7)';
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
