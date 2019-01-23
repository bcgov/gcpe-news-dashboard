import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';

@Component({
  selector: 'app-add-social-media-post-modal',
  templateUrl: './add-social-media-post-modal.component.html',
  styleUrls: ['./add-social-media-post-modal.component.scss']
})

export class AddSocialMediaPostModalComponent implements OnInit {
  @ViewChild('previewPost', { read: ViewContainerRef }) previewPost: ViewContainerRef;
  @ViewChild('preview') tpl: TemplateRef<any>;

  addSocialMediaPostForm: FormGroup;
  previewHidden: boolean;
  url: string;
  postExt: SocialMediaPostExtended;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private socialMediaRenderService: SocialMediaRenderService ) {
    this.createForm();
    this.previewHidden = true;
  }

  ngOnInit() {
  }

  createForm() {
    this.addSocialMediaPostForm = this.formBuilder.group({
      url: '',
    });
  }
  submitForm() {
    this.activeModal.close(this.addSocialMediaPostForm.value);
  }

  previewSocialMediaPost() {
    if ( this.addSocialMediaPostForm.controls['url'] !== null &&  this.addSocialMediaPostForm.controls['url'].valid ) {
      const postUrl = this.addSocialMediaPostForm.controls['url'].value;
      if ( postUrl !== null || postUrl !== 'undefined' ) {
        this.previewPost.clear();
        this.postExt = new SocialMediaPostExtended({url: postUrl});
        const view = this.tpl.createEmbeddedView(null);
        this.previewPost.insert(view);
        this.cd.detectChanges();
        this.socialMediaRenderService.loadWidgets(this.postExt.mediaType);
      }
    }
  }
}
