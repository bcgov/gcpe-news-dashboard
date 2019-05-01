import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AddSocialMediaPostComponent } from './add-social-media-post.component';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { By } from '@angular/platform-browser';
import { SocialMediaPostComponent } from '../social-media-post/social-media-post.component';
import { Router } from '@angular/router';
import { SocialMediaPostsService } from 'src/app/services/socialMediaPosts.service';
import { Injectable } from '@angular/core';
import { SnowplowService } from '../../services/snowplow.service'

@Injectable()
class MockSocialMediaPostsService {
}

describe('AddSocialMediaPostComponent', () => {
  let component: AddSocialMediaPostComponent;
  let fixture: ComponentFixture<AddSocialMediaPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddSocialMediaPostComponent,
        SocialMediaPostComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        SocialMediaRenderService,
        SnowplowService,
        { provide: SocialMediaPostsService, useClass: MockSocialMediaPostsService },
        { provide: Router, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocialMediaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.addSocialMediaPostForm.valid).toBeFalsy();
  });

  it('should start with an invalid url', () => {
    const url = component.addSocialMediaPostForm.controls['url'];
    expect(url.valid).toBeFalsy();
  });

  it('should enable submit button if url input is valid', () => {
    const button = fixture.debugElement.query(By.css('#addSocialMediaPostBtn'));
    spyOn(component, 'submitForm');
    expect(component.addSocialMediaPostForm.valid).toBeFalsy();
    component.addSocialMediaPostForm.controls['url'].setValue('https://www.instagram.com/p/BswQLHvBNVo/?utm_source=ig_web_copy_link');
    expect(component.addSocialMediaPostForm.valid).toBeTruthy();
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable submit button if url input is invalid', () => {
    const button = fixture.debugElement.query(By.css('#addSocialMediaPostBtn'));
    spyOn(component, 'submitForm');
    expect(component.addSocialMediaPostForm.valid).toBeFalsy();
    component.addSocialMediaPostForm.controls['url'].setValue('XXX');
    expect(component.addSocialMediaPostForm.valid).toBeFalsy();
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should preview social media url if valid', () => {
    spyOn(component, 'previewSocialMediaPost');
    component.addSocialMediaPostForm.patchValue({url: 'https://www.instagram.com/p/BswQLHvBNVo/?utm_source=ig_web_copy_link'});
    expect(component.previewSocialMediaPost).toHaveBeenCalled();
  });
});
