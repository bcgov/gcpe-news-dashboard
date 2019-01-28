import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('SocialMediaInputComponent', () => {
  let component: SocialMediaInputComponent;
  let fixture: ComponentFixture<SocialMediaInputComponent>;

  class MockActivatedRoute {
    data = of({
      socialmedia: FakeSocialMediaPostsData(3)
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaInputComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SocialMediaPostsService,
        NavmenuService,
        SocialMediaRenderService,
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
    fixture = TestBed.createComponent(SocialMediaInputComponent);
    component = fixture.componentInstance;
    spyOn(TestBed.get(NavmenuService), 'hide');
    spyOn(TestBed.get(NavmenuService), 'show');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide nav', () => {
    expect(TestBed.get(NavmenuService).hide).toHaveBeenCalled();
  });

  it('should show nav when destroyed', () => {
    fixture.destroy();
    expect(TestBed.get(NavmenuService).show).toHaveBeenCalled();
  });
});
