import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SocialMedia } from '../../shared/social-media';
import { SocialMediaType } from '../../shared/social-media-type';

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.scss']
})
export class SocialMediaListComponent implements OnInit {

  socialmedia: SocialMedia[];
  selectedSocialMedia: SocialMedia[];
  public socialmediatypes: SocialMediaType[];
  filterBy: string = 'All';

  constructor(private router: Router, private apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];

      // mockup data for the media types
      for (var i=0; i<this.socialmedia.length;i++)
      {
        switch (i%5)
        {
          case 0:
            this.socialmedia[i].mediatype = 'Facebook';
            break;
          case 1:
            this.socialmedia[i].mediatype = 'Twitter';
            break;
          case 2:
            this.socialmedia[i].mediatype = 'LinkedIn';
            break;
          case 3:
            this.socialmedia[i].mediatype = 'YouTube';
            break;
          case 4:
            this.socialmedia[i].mediatype = 'SoundCloud';
            break;
        }
      }
    });
    
    this.route.queryParams.subscribe((queryParams:any) => {
      console.log(queryParams.type);
      if (queryParams.type === 'All')
      {
        this.selectedSocialMedia = this.socialmedia;
      }
      else
      {
        this.selectedSocialMedia = this.socialmedia.filter(s=>s.mediatype === queryParams.type);
      }
      
      console.log(this.selectedSocialMedia);
     });
  }

  UpdateSocialMediaTypeFilter(newSocialMediaType: string){
    this.filterBy = newSocialMediaType;
  }

  
}
