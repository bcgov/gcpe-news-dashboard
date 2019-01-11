import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from '../../variables';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { AuthService } from 'src/app/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

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
        HasRoleDirective
      ],
      providers: [
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
