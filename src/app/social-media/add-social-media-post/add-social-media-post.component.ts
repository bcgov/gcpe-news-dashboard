import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { SocialMediaPostsService } from 'src/app/services/socialMediaPosts.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { SnowplowService } from '../../services/snowplow.service';

const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-=\\?\\&-]*/?';

@Component({
  selector: 'app-add-social-media-post',
  templateUrl: './add-social-media-post.component.html',
  styleUrls: ['./add-social-media-post.component.scss']
})

export class AddSocialMediaPostComponent implements OnInit {
  @ViewChild('previewPost', { read: ViewContainerRef }) previewPost: ViewContainerRef;
  @ViewChild('preview') tpl: TemplateRef<any>;

  addSocialMediaPostForm: FormGroup;
  url: string;
  postExt: SocialMediaPostExtended;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private socialMediaService: SocialMediaPostsService,
    private alerts: AlertsService,
    private nav: NavmenuService,
    private socialMediaRenderService: SocialMediaRenderService,
    private snowplowService: SnowplowService ) {
    this.createForm();
  }

  ngOnInit() {
    this.nav.hide();
    this.snowplowService.trackPageView();
  }

  ngOnDestroy(): void {
    this.nav.show();
  }

  createForm() {
    this.addSocialMediaPostForm = this.formBuilder.group({
      url: new FormControl('', [Validators.required, Validators.pattern(reg)]),
    });
    this.addSocialMediaPostForm.valueChanges.subscribe((value) => {
      this.previewSocialMediaPost();
    });
  }

  submitForm() {
    this.socialMediaService.addSocialMediaPost({url: this.addSocialMediaPostForm.value.url, sortOrder: 1}).subscribe(
      () => {
        this.router.navigateByUrl('/social-media-input');
      },
      (err) => {
        this.alerts.showError('Failed to create post');
      }
    );
  }

  get_url(): any {
    return this.addSocialMediaPostForm.controls['url'];
  }

  previewSocialMediaPost() {
    const postUrl = this.addSocialMediaPostForm.controls['url'].value;
    this.previewPost.clear();
    this.postExt = new SocialMediaPostExtended({url: postUrl});
    const view = this.tpl.createEmbeddedView(null);
    this.previewPost.insert(view);
    this.cd.detectChanges();
    this.socialMediaRenderService.loadWidgets(this.postExt.mediaType);
  }
}

