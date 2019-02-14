import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivityForecastListComponent } from './activity-forecast-list.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from '../../variables';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { AppConfigService } from 'src/app/app-config.service';
import { of } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { mockAuth } from 'src/app/test-helpers/mock-auth';

describe('ActivityForecastListComponent', () => {
  let component: ActivityForecastListComponent;
  let fixture: ComponentFixture<ActivityForecastListComponent>;
  let alerts: AlertsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule,
        HttpClientModule
      ],
      declarations: [
        ActivityForecastListComponent,
        HqDashboardSubMenuComponent,
        HasRoleDirective
      ],
      providers: [
        AlertsService,
        AlertComponent,
        { provide: AppConfigService, useValue: { config: { HUB_URL: '' } } },
        { provide: BASE_PATH, useValue: environment.apiUrl },
        { provide: AuthService, useClass: mockAuth }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityForecastListComponent);
    spyOn(TestBed.get(AlertsService), 'showError');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if activies retrieval fails', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of(null)}});
    fixture.detectChanges();
    expect(TestBed.get(AlertsService).showError).toHaveBeenCalled();
  });
});
