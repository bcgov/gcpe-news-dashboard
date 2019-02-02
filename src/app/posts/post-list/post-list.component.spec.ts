import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from '../../variables';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { AuthService } from 'src/app/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { PluralizeKindPipe } from 'src/app/_pipes/pluralize-kind.pipe';
import { AppConfigService } from 'src/app/app-config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { of } from 'rxjs';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

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
        AuthService,
        {provide: OAuthService, useValue: {
          getIdentityClaims: () => ['Administrators']
        }}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    spyOn(TestBed.get(AlertsService), 'showError');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert if post list retrieval fails', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of(null)}});
    fixture.detectChanges();
    expect(TestBed.get(AlertsService).showError).toHaveBeenCalled();
  });
});
