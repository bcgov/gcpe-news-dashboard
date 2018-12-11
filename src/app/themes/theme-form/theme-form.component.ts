import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavmenuService } from '../../services/navmenu.service';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {
  title = new FormControl('');

  constructor(public nav: NavmenuService) { }

  ngOnInit() {
    this.nav.change('theme-form');
  }

  ngOnDestroy() {
    this.nav.change('default');
  }

}
