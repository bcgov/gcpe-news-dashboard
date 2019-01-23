import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';

@Component({
  selector: 'app-delete-post-confirmation-modal',
  templateUrl: './delete-post-confirmation-modal.component.html',
  styleUrls: ['./delete-post-confirmation-modal.component.scss']
})
export class DeletePostConfirmationModalComponent implements OnInit, AfterViewInit {

  @Input() postExt: SocialMediaPostExtended;

  constructor( public activeModal: NgbActiveModal, private socialMediaRenderService: SocialMediaRenderService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.socialMediaRenderService.loadWidgets(this.postExt.mediaType);
  }
}
