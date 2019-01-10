import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialMediaListInputComponent } from './social-media-list-input.component';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup} from '@angular/forms';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BASE_PATH } from '../../variables';
import { environment } from '../../../environments/environment';
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component'
import { Button } from 'protractor';

describe('SocialMediaListInputComponent', () => {
  let component: SocialMediaListInputComponent;
  let fixture: ComponentFixture<SocialMediaListInputComponent>;
  let div: HTMLElement;

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
        { provide: BASE_PATH, useValue: environment.apiUrl }
      ]
    })
    .compileComponents();
  }));

  describe('it should create the social media input', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SocialMediaListInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', ()  => {
      expect(component).toBeTruthy();
    });
  });

  describe('should call addSocialMediaPost and add new social post entry ', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SocialMediaListInputComponent);
      component = fixture.componentInstance;
      const button = fixture.debugElement.nativeElement.querySelector('#addSocialMediaPostBtn');
      const spy = spyOn(component, 'addSocialMediaPost');
      fixture.detectChanges();
    });
    it('should create', ()  => {
      expect(component).toBeTruthy();
    });
    it('should call addSocialMediaPost', ()  => {
      console.log(Button);
    });
  });

});
