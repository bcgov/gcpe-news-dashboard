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
  @Input() userMinistries: Array<string>;
  @Input() userMinistriesAbbreviations: Array<string>;
  filterBySocialMediaType: string;
  filterByMinistries: string;
  filterByMinistryAbbreviations: string;
  ministryFilterDisplayValue: string;
  currentUrl = '';
  submenuOpen = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe((queryParams: any) => {
        this.filterBySocialMediaType = queryParams.type || 'All';
        this.filterByMinistries = queryParams.ministries || 'All';
        this.filterByMinistryAbbreviations = queryParams.ministries || 'All';
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
