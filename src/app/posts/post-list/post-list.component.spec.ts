import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from '../../variables';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { AuthService } from 'src/app/_auth/auth.service';
import { PluralizeKindPipe } from 'src/app/_pipes/pluralize-kind.pipe';
import { AppConfigService } from 'src/app/app-config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { of } from 'rxjs';
import { FakePostsData } from 'src/app/test-helpers/posts';
import { mockAuth } from 'src/app/test-helpers/mock-auth';
import { MinistriesProvider } from 'src/app/_providers/ministries.provider';
import { MockMinistriesProvider } from 'src/app/_providers/mock-ministries.provider';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let div: HTMLElement;
  const userMinistry = 'FakeMinistry';

  class MockActivatedRoute {
    queryParams = of({ type: 'All'});
    data = of({
      posts: FakePostsData(20)
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        HttpClientModule
       ],
      declarations: [
        PostListComponent,
        HqDashboardSubMenuComponent,
        HasRoleDirective,
        PluralizeKindPipe
      ],
      providers: [
        AlertsService,
        { provide: AppConfigService, useValue: { config: { NEWS_URL: "" } } },
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: AuthService, useClass: mockAuth },
        { provide: MinistriesProvider, useClass: MockMinistriesProvider }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute,
      { useValue: {
        data: of({
          posts: FakePostsData(20)
        }),
        queryParams: of({ ministries: 'All'})
    }});
    fixture = TestBed.createComponent(PostListComponent);
    spyOn(TestBed.get(AlertsService), 'showError');
    component = fixture.componentInstance;
    component.selectedPosts = FakePostsData(20);
    fixture.detectChanges();
    div = fixture.nativeElement.querySelector('#post-list');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert if post list retrieval fails', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of(null)}});
    fixture.detectChanges();
    expect(TestBed.get(AlertsService).showError).toHaveBeenCalled();
  });

  it('should get 20 posts', () => {
    component.ngOnInit();
    expect(div.querySelectorAll('.card').length).toBe(20);
  });

  describe('get 5 posts filtered by my selected ministry', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute,
        { useValue: {
          data: of({
            posts: FakePostsData(5)
          }),
          queryParams: of({ ministries: 'My%20Ministry'})
      }});
      fixture = TestBed.createComponent(PostListComponent);
      component = fixture.componentInstance;
      component.selectedPosts = FakePostsData(5);
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#post-list');
    });
    it('should create', ()  => {
      expect(component).toBeTruthy();
    });
    it('should get 5 Fake Ministry posts', ()  => {
      component.ngOnInit();
      expect(div.querySelectorAll('.card').length).toBe(5);
      const posts = component.selectedPosts.filter(s => s.leadMinistryName === userMinistry);
      expect(posts.length).toEqual(5);
    });
  });
});
