import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialMediaPageViewComponent } from './social-media-page-view.component';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BASE_PATH } from '../../variables';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from 'src/app/core/loading-spinner/loading-spinner.component';

describe('SocialMediaPageViewComponent', () => {
  let component: SocialMediaPageViewComponent;
  let fixture: ComponentFixture<SocialMediaPageViewComponent>;

  class MockActivatedRoute {
    queryParams = of({ type: 'All'});
    data = of({
      socialmedia: FakeSocialMediaPostsData(3)
    });
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        HttpClientTestingModule
       ],
      declarations: [
        SocialMediaPageViewComponent,
        LoadingSpinnerComponent
      ],
      providers: [
        SocialMediaRenderService,
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        SocialMediaRenderService,
      ]
    })
    .compileComponents();
  }));
});
