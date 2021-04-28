import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SocialMediaInputComponent } from './social-media-input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { NavmenuService } from 'src/app/services/navmenu.service';
import { BASE_PATH } from '../../variables';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';
import { By } from '@angular/platform-browser';
import { LoadingSpinnerComponent } from 'src/app/core/loading-spinner/loading-spinner.component';
import { SocialMediaPostComponent } from '../social-media-post/social-media-post.component';
import { SnowplowService } from '../../services/snowplow.service';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/_auth/auth.service';
import { mockAuth } from 'src/app/test-helpers/mock-auth';

const SocialMediaInputListDivName = '#new-social-media-input-list';

describe('SocialMediaInputComponent', () => {
  let component: SocialMediaInputComponent;
  let fixture: ComponentFixture<SocialMediaInputComponent>;
  let div: HTMLElement;

  class MockActivatedRoute {
    data = of({
      socialmedia: FakeSocialMediaPostsData(3)
    });
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialMediaInputComponent,
        LoadingSpinnerComponent,
        SocialMediaPostComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterModule
      ],
      providers: [
        SocialMediaPostsService,
        NavmenuService,
        SocialMediaRenderService,
        SnowplowService,
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: AuthService, useClass: mockAuth }
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
    fixture = TestBed.createComponent(SocialMediaInputComponent);
    component = fixture.componentInstance;
    spyOn(TestBed.get(NavmenuService), 'hide');
    spyOn(TestBed.get(NavmenuService), 'show');
    fixture.detectChanges();
    div = fixture.nativeElement.querySelector(SocialMediaInputListDivName);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 9 social media post input entries', ()  => {
    component.ngOnInit();
    component.ngAfterViewInit();
    expect(div.querySelectorAll('.social-media-post').length).toBe(9);
  });

  it('should call deleteSocialMediaPost when clicking on the delete post button', ()  => {
    spyOn(component, 'deleteSocialMediaPost');
    const button = fixture.debugElement.query(By.css('.btn.btn-link.delete-social-media-post-btn'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.deleteSocialMediaPost).toHaveBeenCalled();
  });

  it('should call pinSocialMediaPost when clicking on the pin post button', ()  => {
    spyOn(component, 'pinSocialMediaPost');
    const button = fixture.debugElement.query(By.css('.btn.btn-link.pin-social-media-post-btn'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.pinSocialMediaPost).toHaveBeenCalled();
  });

});
