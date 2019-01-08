import { ComponentFixture, async, TestBed, fakeAsync } from '@angular/core/testing';
import { SocialMediaPostListComponent } from './social-media-post-list.component';
import { ApiService } from '../../services/api.service';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { BASE_PATH } from '../../variables';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';
import { FakeSocialMediaTypesData } from '../../test-helpers/social-media-types';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SocialMediaPostListComponent', () => {
  let component: SocialMediaPostListComponent;
  let fixture: ComponentFixture<SocialMediaPostListComponent>;
  class MockActivatedRoute {
    queryParams = of({ type: 'All'});
    data = of({
      socialmedia: FakeSocialMediaPostsData(3),
      socialmediatype: FakeSocialMediaTypesData()
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
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
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async() => {
    TestBed.overrideProvider(ActivatedRoute,
      { useValue: {
        data: of({
          socialmedia: FakeSocialMediaPostsData(3),
          socialmediatype: FakeSocialMediaTypesData()
        }),
        queryParams: of({ type: 'All'})
    }});
    fixture = TestBed.createComponent(SocialMediaPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', async(()  => {
    expect(component).toBeTruthy();
  }));
});
