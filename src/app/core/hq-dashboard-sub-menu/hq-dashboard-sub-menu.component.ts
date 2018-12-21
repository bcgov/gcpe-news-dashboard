import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-hq-dashboard-sub-menu',
  templateUrl: './hq-dashboard-sub-menu.component.html',
  styleUrls: ['./hq-dashboard-sub-menu.component.scss']
})
export class HqDashboardSubMenuComponent  {
  hideSocialMediaFilter = false;
  @Input() socialmediatypes: SocialMediaType[];
  filterBySocialMediaType: string = 'All';

  constructor(private router: Router, private route: ActivatedRoute, private apiService:  ApiService) {
    
    // Only display the social media filter dropdown when social media link is active
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if ( event.url.indexOf('/social-media-list') > -1 ) {
          this.hideSocialMediaFilter = false;
        }  else {
          this.hideSocialMediaFilter = true;  
        }
      }
    });
  }

  updateSocialMediaType(newType: string) {
    this.filterBySocialMediaType = newType;
  }
}
