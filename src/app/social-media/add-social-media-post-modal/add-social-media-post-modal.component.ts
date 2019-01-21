import { Component, OnInit, AfterViewInit, ViewContainerRef, Output, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ElementRef, Renderer2, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaPostPreviewComponent } from '../social-media-post-preview/social-media-post-preview.component';
import { SocialMediaPostItem } from '../social-media-post-item';
import { SocialMediaPostPreviewDirective } from '../social-media-post-preview.directive';

declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-add-social-media-post-modal',
  templateUrl: './add-social-media-post-modal.component.html',
  styleUrls: ['./add-social-media-post-modal.component.scss']
})

export class AddSocialMediaPostModalComponent implements OnInit, AfterViewInit {
  @ViewChild('previewPost', { read: ViewContainerRef }) previewPost: ViewContainerRef;
  @ViewChild('preview') tpl: TemplateRef<any>;

  addSocialMediaPostForm: FormGroup;
  previewHidden: boolean;
  url: string;
  postExt: SocialMediaPostExtended;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef ) {
    this.createForm();
    this.previewHidden = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadTwitterWidgets();
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
        this.loadWidgets(this.postExt.mediaType);
        /*
        this.initSocialMediaPostInfo(postUrl);
        this.previewHidden = false;
        this.previewPost.clear();
        const factory = this.resolver.resolveComponentFactory(SocialMediaPostPreviewComponent);
        const componentRef = this.previewPost.createComponent(factory);
        componentRef.instance.url = postUrl;
        this.cd.detectChanges();
        */
      }
    }
    //console.log(this.addSocialMediaPostForm.controls['url'].value);
  }

  initSocialMediaPostInfo(postUrl: string) {
    const postExt = new SocialMediaPostExtended({ url: postUrl });
  }
}
