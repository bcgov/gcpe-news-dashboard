import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';


@Component({
  selector: 'app-hq-dashboard-sub-menu',
  templateUrl: './hq-dashboard-sub-menu.component.html',
  styleUrls: ['./hq-dashboard-sub-menu.component.scss']
})
export class HqDashboardSubMenuComponent implements OnInit {
  @Input() socialmediatypes: SocialMediaType[];
  filterBySocialMediaType: string;
  submenuOpen = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe((queryParams: any) => {
        this.filterBySocialMediaType = queryParams.type || 'All';
      });
    }
  }

  updateSocialMediaType(newType: string) {
    this.filterBySocialMediaType = newType;
  }

  print() {
    window.print();
  }

  toggleSubmenu() {
    if(this.submenuOpen) {
      return;
    }
    this.submenuOpen = !this.submenuOpen;
  }
}
