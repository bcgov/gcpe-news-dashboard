import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'news-dashboard-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isCollapsed = true;
  ngOnInit() {
    
  }
}
