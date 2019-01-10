import { ComponentFixture, async, TestBed } from '@angular/core/testing';
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
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

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
      console.log(div.querySelectorAll('.social-media-post'));
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
      console.log(div.querySelectorAll('.social-media-post'));
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
      console.log(div.querySelectorAll('.social-media-post'));
      expect(div.querySelectorAll('.social-media-post').length).toBe(5);
    });
  });

});
