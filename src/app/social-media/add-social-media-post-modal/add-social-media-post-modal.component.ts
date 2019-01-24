import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';

const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-=\\?\\&]*/?';

@Component({
  selector: 'app-add-social-media-post-modal',
  templateUrl: './add-social-media-post-modal.component.html',
  styleUrls: ['./add-social-media-post-modal.component.scss']
})

export class AddSocialMediaPostModalComponent implements OnInit {
  @ViewChild('previewPost', { read: ViewContainerRef }) previewPost: ViewContainerRef;
  @ViewChild('preview') tpl: TemplateRef<any>;

  addSocialMediaPostForm: FormGroup;
  url: string;
  postExt: SocialMediaPostExtended;
  disableSubmitBtn: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private socialMediaRenderService: SocialMediaRenderService ) {
    this.createForm();
    this.disableSubmitBtn = true;
  }

  ngOnInit() {
  }

  createForm() {
    this.addSocialMediaPostForm = this.formBuilder.group({
      url: new FormControl('', [Validators.required, Validators.pattern(reg)]),
    });
  }
  submitForm() {
    this.activeModal.close(this.addSocialMediaPostForm.value);
  }

  get_url(index: number): any {
    return this.addSocialMediaPostForm.controls['url'];
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
        this.socialMediaRenderService.loadWidget(this.postExt.mediaType, document.getElementById('add-social-media-post'));
      }
    }
  }
}
