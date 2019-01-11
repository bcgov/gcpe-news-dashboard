import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { SocialMediaListInputComponent } from './social-media-list-input.component';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup} from '@angular/forms';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BASE_PATH } from '../../variables';
import { environment } from '../../../environments/environment';
<<<<<<< HEAD
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component';
import { By } from '@angular/platform-browser';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FacebookPost } from 'src/app/view-models/facebook-post';
||||||| merged common ancestors
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component'
=======
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component';
>>>>>>> 97273cfc677f0906315125f6998610897fa5ed6f

describe('SocialMediaListInputComponent', () => {
  let component: SocialMediaListInputComponent;
  let fixture: ComponentFixture<SocialMediaListInputComponent>;
<<<<<<< HEAD
  let div: HTMLElement;

  class MockActivatedRoute {
    data = of({
      socialmedia: FakeSocialMediaPostsData(3)
    });
  }
||||||| merged common ancestors
  let formBuilder = new FormBuilder();
=======
  const formBuilder = new FormBuilder();
>>>>>>> 97273cfc677f0906315125f6998610897fa5ed6f

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialMediaListInputComponent,
        DeletePostConfirmationModalComponent
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
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    div = fixture.nativeElement.querySelector('#postList');
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
    expect(div.querySelectorAll('.row').length).toBe(10);
  });

  it('should call addSocialMediaPost', ()  => {
    spyOn(component, 'addSocialMediaPost');
    component.socialMediaPostListForm.get('postList').patchValue({url: 'Test'});
    
    component.submit();

   
    fixture.detectChanges();

    expect(component.submit).toHaveBeenCalled();
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

});
