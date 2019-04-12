import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { SocialMediaPostListComponent } from './social-media-post-list.component';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { BASE_PATH } from '../../variables';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { AuthService } from 'src/app/_auth/auth.service';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { mockAuth } from 'src/app/test-helpers/mock-auth';
import { LoadingSpinnerComponent } from 'src/app/core/loading-spinner/loading-spinner.component';
import { SocialMediaPostComponent } from '../social-media-post/social-media-post.component';

describe('SocialMediaPostListComponent', () => {
  let component: SocialMediaPostListComponent;
  let fixture: ComponentFixture<SocialMediaPostListComponent>;
  let div: HTMLElement;

  class MockActivatedRoute {
    queryParams = of({ type: 'All'});
    data = of({
      socialmedia: FakeSocialMediaPostsData(3)
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
        HqDashboardSubMenuComponent,
        HasRoleDirective,
        LoadingSpinnerComponent,
        SocialMediaPostComponent
      ],
      providers: [
        SocialMediaPostsService,
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        SocialMediaRenderService,
        { provide: AuthService, useClass: mockAuth }
      ]
    })
    .compileComponents();
  }));

  describe('get all social media posts', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute,
        { useValue: {
          data: of({
            socialmedia: FakeSocialMediaPostsData(3)
          }),
          queryParams: of({ type: 'All'})
      }});
      fixture = TestBed.createComponent(SocialMediaPostListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#social-media-list');
    });
    it('should create', ()  => {
      expect(component).toBeTruthy();
    });
    it('should get 9 social media posts', async(()  => {
      component.ngOnInit();
      component.ngAfterViewInit();
      expect(div.querySelectorAll('.social-media-post').length).toBe(9);
    }));
  });

  describe('get Facebook social media posts', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute,
        { useValue: {
          data: of({
            socialmedia: FakeSocialMediaPostsData(3)
          }),
          queryParams: of({ type: 'Facebook'})
      }});
      fixture = TestBed.createComponent(SocialMediaPostListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#social-media-list');
    });
    it('should create', ()  => {
      expect(component).toBeTruthy();
    });
    it('should get 3 Facebook social media posts', ()  => {
      component.ngOnInit();
      component.ngAfterViewInit();
      expect(div.querySelectorAll('.social-media-post').length).toBe(3);
    });
  });

  describe('get 4 Twitter social media posts', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute,
        { useValue: {
          data: of({
            socialmedia: FakeSocialMediaPostsData(4),
          }),
          queryParams: of({ type: 'Twitter'})
      }});
      fixture = TestBed.createComponent(SocialMediaPostListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#social-media-list');
    });
    it('should create', ()  => {
      expect(component).toBeTruthy();
    });
    it('should get 4 Twitter social media posts', ()  => {
      component.ngOnInit();
      component.ngAfterViewInit();
      expect(div.querySelectorAll('.social-media-post').length).toBe(4);
    });
  });

  describe('get 5 Instagram social media posts', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute,
        { useValue: {
          data: of({
            socialmedia: FakeSocialMediaPostsData(5)
          }),
          queryParams: of({ type: 'Instagram'})
      }});
      fixture = TestBed.createComponent(SocialMediaPostListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      div = fixture.nativeElement.querySelector('#social-media-list');
    });
    it('should create', ()  => {
      expect(component).toBeTruthy();
    });
    it('should get 3 Instagram social media posts', ()  => {
      component.ngOnInit();
      component.ngAfterViewInit();
      expect(div.querySelectorAll('.social-media-post').length).toBe(5);
    });
  });

});
