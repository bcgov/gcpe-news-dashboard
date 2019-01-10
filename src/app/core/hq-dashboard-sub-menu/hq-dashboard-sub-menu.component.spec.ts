import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HqDashboardSubMenuComponent } from './hq-dashboard-sub-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { BASE_PATH } from '../../variables';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from 'src/app/services/auth.service';

describe('HqDashboardSubMenuComponent', () => {
  let component: HqDashboardSubMenuComponent;
  let fixture: ComponentFixture<HqDashboardSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterModule
      ],
      declarations: [
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
    fixture = TestBed.createComponent(HqDashboardSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
