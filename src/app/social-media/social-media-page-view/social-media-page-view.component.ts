import { Component, OnInit } from '@angular/core';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';

@Component({
  selector: 'app-social-media-page-view',
  templateUrl: './social-media-page-view.component.html',
  styleUrls: ['./social-media-page-view.component.scss']
})
export class SocialMediaPageViewComponent implements OnInit {

  constructor(private socialMediaRenderService: SocialMediaRenderService) { }

  ngOnInit(): void {
    this.socialMediaRenderService.initFacebook();
    this.socialMediaRenderService.loadTwitterWidgets();
  }

}
