import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AddSocialMediaPostModalComponent } from './add-social-media-post-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { By } from '@angular/platform-browser';
import { SocialMediaPostComponent } from '../social-media-post/social-media-post.component';

describe('AddSocialMediaPostModalComponent', () => {
  let component: AddSocialMediaPostModalComponent;
  let fixture: ComponentFixture<AddSocialMediaPostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddSocialMediaPostModalComponent,
        SocialMediaPostComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        NgbActiveModal,
        SocialMediaRenderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocialMediaPostModalComponent);
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
    const button = fixture.debugElement.query(By.css('#previewSocialMediaPostBtn'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.previewSocialMediaPost).toHaveBeenCalled();
  });
});
