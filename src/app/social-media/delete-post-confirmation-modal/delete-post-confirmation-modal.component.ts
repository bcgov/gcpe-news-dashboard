import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';

declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-delete-post-confirmation-modal',
  templateUrl: './delete-post-confirmation-modal.component.html',
  styleUrls: ['./delete-post-confirmation-modal.component.scss']
})
export class DeletePostConfirmationModalComponent implements OnInit, AfterViewInit {

  @Input() url;
  postExt: SocialMediaPostExtended;

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit() {
    this.postExt = new SocialMediaPostExtended({url: this.url});
  }

  ngAfterViewInit() {
    this.loadWidgets(this.postExt.mediaType);
  }

  loadTwitterWidgets() {
    if (twttr.ready()) {
      twttr.widgets.load();
    }
  }

  loadFacebookWidgets() {
    // remove the fb-post class from the posts that have already been rendered so they don't flicker when we parse/render the next one
    const fbPosts = document.getElementsByClassName('fb-post');
    for (let i = fbPosts.length - 1; i >= 0; i--) {
      fbPosts[i].className = fbPosts[i].className.replace('fb-post ', '');
    }
    FB.init({
      xfbml: true,
      version: 'v3.2'
    });
    FB.XFBML.parse();
  }

  loadInstagramWidgets() {
    instgrm.Embeds.process();
  }

  loadWidgets(mediaType: any) {
    switch (mediaType) {
      case 'Facebook':
        this.loadFacebookWidgets();
        break;
      case 'Twitter':
        this.loadTwitterWidgets();
        break;
      case 'Instagram':
        this.loadInstagramWidgets();
    }
  }
}
