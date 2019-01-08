import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { SocialMediaPostListComponent } from './social-media-post-list.component';
import { ApiService } from '../../services/api.service';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { BASE_PATH } from '../../variables';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';

describe('SocialMediaPostListComponent', () => {
  let component: SocialMediaPostListComponent;
  let fixture: ComponentFixture<SocialMediaPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
       ],
      declarations: [
        SocialMediaPostListComponent,
        HqDashboardSubMenuComponent
      ],

      providers: [
        ApiService,
        SocialMediaPostsService,
        { provide: BASE_PATH, useValue: environment.apiUrl }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', ()  => {
    expect(component).toBeTruthy();
  });
});
