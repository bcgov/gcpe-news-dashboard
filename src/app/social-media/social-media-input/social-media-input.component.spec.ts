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
import { By } from '@angular/platform-browser';

describe('SocialMediaInputComponent', () => {
  let component: SocialMediaInputComponent;
  let fixture: ComponentFixture<SocialMediaInputComponent>;
  let div: HTMLElement;

  class MockActivatedRoute {
    data = of({
      socialmedia: FakeSocialMediaPostsData(3)
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialMediaInputComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SocialMediaPostsService,
        NavmenuService,
        SocialMediaRenderService,
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
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
    div = fixture.nativeElement.querySelector('#social-media-input-list');
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

  it('should create 9 social media post input entries', ()  => {
    component.ngOnInit();
    expect(div.querySelectorAll('.social-media-post').length).toBe(9);
  });

  it('should call addSocialMediaPost when clicking on the add button', ()  => {
    spyOn(component, 'addSocialMediaPost');
    const button = fixture.debugElement.query(By.css('#addSocialMediaPostBtn'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.addSocialMediaPost).toHaveBeenCalled();
  });

  it('should call backToSocialMediaList when clicking on the back button', ()  => {
    spyOn(component, 'backToSocialMediaList');
    const button = fixture.debugElement.query(By.css('#backToListBtn'));
    button.triggerEventHandler('click.preventDefault', null);
    fixture.detectChanges();
    expect(component.backToSocialMediaList).toHaveBeenCalled();
  });

  it('should call deleteSocialMediaPost when clicking on the delete post button', ()  => {
    spyOn(component, 'deleteSocialMediaPost');
    const button = fixture.debugElement.query(By.css('.btn.btn-link.delete-social-media-post-btn'));
    button.triggerEventHandler('click.preventDefault', null);
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
