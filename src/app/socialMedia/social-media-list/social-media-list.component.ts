import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SocialMedia } from '../../shared/social-media';

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.scss']
})
export class SocialMediaListComponent implements OnInit {

  public socialmedia: SocialMedia[];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      console.log(data);
    });
  }

  getSocialMedia() {
    this.apiService.getSocialMedia().subscribe((data) => {
      this.socialmedia = data;
    }, error => console.error(error));
  }

}
