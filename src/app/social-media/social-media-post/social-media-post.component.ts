import { Component, OnInit, Input } from '@angular/core';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';

@Component({
  selector: 'app-social-media-post',
  templateUrl: './social-media-post.component.html',
  styleUrls: ['./social-media-post.component.scss']
})
export class SocialMediaPostComponent implements OnInit {
  @Input() postExt: SocialMediaPostExtended;
  constructor() { }

  ngOnInit() {
  }

}
