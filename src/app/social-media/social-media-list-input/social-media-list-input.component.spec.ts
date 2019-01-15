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

  it('should call close function after submit', ()  => {
    spyOn(component, 'close');
    component.submit();
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

  it('should click the delete button', ()  => {
    spyOn(component, 'deleteSocialMediaPost');
    const button = fixture.debugElement.query(By.css('#deleteBtn_0'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.deleteSocialMediaPost).toHaveBeenCalled();
    const modalDiv = fixture.debugElement.query(By.css('.modal-header'));
  });

  it('should call delete a post and confirmation modal will show', ()  => {
    spyOn(component, 'deleteSocialMediaPost');
    //const observe = of({});
    //spyOn(socialMediaPostsService, 'deleteSocialMediaPost').and.returnValue(observe);
    component.deleteSocialMediaPost(0);
    fixture.detectChanges();
    expect(component.deleteSocialMediaPost).toHaveBeenCalled();
    expect(component.modalRef.close).toHaveBeenCalled();
    const modalDiv = fixture.debugElement.query(By.css('.modal-header'));
    console.log(component.modalRef);
    console.log(modalDiv);
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

  it('should add new post when entering the valid url', () => {
    spyOn(component, 'close');
    const observe = of({});
    spyOn(socialMediaPostsService, 'addSocialMediaPost').and.returnValue(observe);
    component.addSocialMediaPost();
    const newPostInput = fixture.debugElement.query(By.css('#rowPost_0 input'));
    const el = newPostInput.nativeElement;
    el.value = 'https://twitter.com/BCGovNews/status/1080146634355417088';
    el.dispatchEvent(new Event('input'));
    expect(el.value).toBe('https://twitter.com/BCGovNews/status/1080146634355417088');
    component.submit();
    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  });

  it('should swap the 2 posts', () => {
    const firstPost = fixture.debugElement.query(By.css('#rowPost_2 input')).nativeElement;
    const secondPost = fixture.debugElement.query(By.css('#rowPost_3 input')).nativeElement;
    component.move(1, 2);
    fixture.detectChanges();
    const newFirstPost = fixture.debugElement.query(By.css('#rowPost_2 input')).nativeElement;
    const newsSecondPost = fixture.debugElement.query(By.css('#rowPost_3 input')).nativeElement;
    expect(newFirstPost.value).toBe(secondPost.value);
    expect(newsSecondPost.value).toBe(firstPost.value);
  });

  it('should handle a sort down post succesfully', () => {
    spyOn(component, 'move');
    spyOn(component, 'close');
    const observe = of({});
    spyOn(socialMediaPostsService, 'updateSocialMediaPost').and.returnValue(observe);
    const buttonUp = fixture.debugElement.query(By.css('#moveUpBtn_0'));
    buttonUp.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.move).toHaveBeenCalledWith(-1, 0);
    const buttonDown = fixture.debugElement.query(By.css('#moveDownBtn_0'));
    buttonDown.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.move).toHaveBeenCalledWith(1, 0);
    component.submit();
    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  });
});
