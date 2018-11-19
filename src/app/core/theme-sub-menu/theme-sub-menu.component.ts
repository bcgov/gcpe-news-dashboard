import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../shared/social-media-type';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-theme-sub-menu',
  templateUrl: './theme-sub-menu.component.html',
  styleUrls: ['./theme-sub-menu.component.scss']
})
export class ThemeSubMenuComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private apiService:  ApiService) {
  }

  ngOnInit() {
  }

}
