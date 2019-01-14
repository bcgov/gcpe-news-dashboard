import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { SocialMediaListInputComponent } from './social-media-list-input.component';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup} from '@angular/forms';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BASE_PATH } from '../../variables';
import { environment } from '../../../environments/environment';
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component';
import { By } from '@angular/platform-browser';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SocialMediaListInputComponent', () => {
  let component: SocialMediaListInputComponent;
  let fixture: ComponentFixture<SocialMediaListInputComponent>;
  let div: HTMLElement;
  let socialMediaPostsService: SocialMediaPostsService;

  class MockActivatedRoute {
    data = of({
      socialmedia: FakeSocialMediaPostsData(3)
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialMediaListInputComponent,
        DeletePostConfirmationModalComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SocialMediaPostsService,
        NavmenuService,
        FormBuilder,
        { provide: BASE_PATH, useValue: environment.apiUrl }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute,
      { useValue: {
        data: of({
          socialmedia: FakeSocialMediaPostsData(3)
        }),
    }});
    fixture = TestBed.createComponent(SocialMediaListInputComponent);
    component = fixture.componentInstance;
    spyOn(TestBed.get(NavmenuService), 'hide');
    spyOn(TestBed.get(NavmenuService), 'show');
    fixture.detectChanges();
    div = fixture.nativeElement.querySelector('#postList');
    socialMediaPostsService = TestBed.get(SocialMediaPostsService);
  });

  it('should create', ()  => {
    expect(component).toBeTruthy();
  });

  it('should hide nav', () => {
    expect(TestBed.get(NavmenuService).hide).toHaveBeenCalled();
  });

  it('should show nav when destroyed', () => {
    fixture.destroy();
    expect(TestBed.get(NavmenuService).show).toHaveBeenCalled();
  });

  it('should create a `FormGroup` comprised of `FormControl`s', () => {
    component.ngOnInit();
    expect(component.socialMediaPostListForm instanceof FormGroup).toBe(true);
  });

  it('should create a `FormControl` for each social media post', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.socialMediaPostListForm.controls['postList'].value.length).toBe(9);
  });

  it('should create 9 social media post input entries', ()  => {
    component.ngOnInit();
    expect(div.querySelectorAll('.row').length).toBe(9);
  });

  it('should call addSocialMediaPost', ()  => {
    spyOn(component, 'addSocialMediaPost');
    const button = fixture.debugElement.query(By.css('#addSocialMediaPostBtn'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.addSocialMediaPost).toHaveBeenCalled();
  });

  it('should call initFormArray', ()  => {
    spyOn(component, 'initFormArray');
    const post =  {
      url: '',
      sortOrder: 10,
    };
    component.initFormArray(FakeSocialMediaPostsData(4));
    fixture.detectChanges();
    expect(component.initFormArray).toHaveBeenCalled();
  });

  it('should call close function', ()  => {
    spyOn(component, 'close');
    const button = fixture.debugElement.query(By.css('#cancelInputBtn'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  });

  it('should call submit function', ()  => {
    spyOn(component, 'submit');
    const button = fixture.debugElement.query(By.css('#submitSocialMediaInputBtn'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should cancel and redirect', () => {
    spyOn(component, 'close');
    fixture.detectChanges();
    component.close();
    expect(component.close).toHaveBeenCalled();
  });

  it('should call delete a post and confirmation modal will show', ()  => {
    spyOn(component, 'deleteSocialMediaPost');
    const button = fixture.debugElement.query(By.css('#deleteBtn_0'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.deleteSocialMediaPost).toHaveBeenCalled();
  });

  it('should add insert a row when click on Add button', () => {
    spyOn(socialMediaPostsService, 'addSocialMediaPost');
    component.addSocialMediaPost();
    fixture.detectChanges();
    expect(div.querySelectorAll('.row').length).toBe(10);
  });

  it('should add insert a row when click on Add button', () => {
    spyOn(socialMediaPostsService, 'addSocialMediaPost');
    component.addSocialMediaPost();
    fixture.detectChanges();
    expect(div.querySelectorAll('.row').length).toBe(10);
  });

  it('should display warning when entering a new post with invalid url format', () => {
    spyOn(socialMediaPostsService, 'addSocialMediaPost');
    component.addSocialMediaPost();
    const newPostInput = fixture.debugElement.query(By.css('#rowPost_0 input'));
    const el = newPostInput.nativeElement;
    el.value = 'someValue';
    el.dispatchEvent(new Event('input'));
    expect(el.value).toBe('someValue');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.alert-danger'))).toBeTruthy();
  });

  it('should handle a sort down post succesfully', () => {
    const posts = FakeSocialMediaPostsData(4);
    component.socialmedialist = FakeSocialMediaPostsData(3);
    spyOn(socialMediaPostsService, 'updateSocialMediaPost');
    const postToSort = posts[0];
    component.move(-1, 1);
    component.submit();
    fixture.detectChanges();
    expect(socialMediaPostsService.updateSocialMediaPost).toHaveBeenCalledWith();
  });

});
