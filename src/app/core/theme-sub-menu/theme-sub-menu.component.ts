import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-theme-sub-menu',
  templateUrl: './theme-sub-menu.component.html',
  styleUrls: ['./theme-sub-menu.component.scss']
})
export class ThemeSubMenuComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
