import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivityForecastListComponent } from './activity-forecast-list.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from '../../variables';
import { Activity } from '../../view-models/activity';
import { HasRoleDirective } from 'src/app/_directives/hasRole.directive';
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { AppConfigService } from 'src/app/app-config.service';
import { of } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { FakeActivitiesData } from 'src/app/test-helpers/activities';
import { mockAuth } from 'src/app/test-helpers/mock-auth';

describe('ActivityForecastListComponent', () => {
  let component: ActivityForecastListComponent;
  let fixture: ComponentFixture<ActivityForecastListComponent>;
  let alerts: AlertsService;
  let div: HTMLElement;

  class MockActivatedRoute {
    queryParams = of({ type: 'All'});
    data = of({
      activities: FakeActivitiesData(20)
    });
  }

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
    TestBed.overrideProvider(ActivatedRoute,
      { useValue: {
        data: of({
          activities: FakeActivitiesData(20)
        }),
        queryParams: of({ ministries: 'All'})
    }});
    fixture = TestBed.createComponent(ActivityForecastListComponent);
    spyOn(TestBed.get(AlertsService), 'showError');
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.activities = FakeActivitiesData(20);
    div = fixture.nativeElement.querySelector('#activity-forecast-list');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if activies retrieval fails', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { data: of(null)}});
    fixture.detectChanges();
    expect(TestBed.get(AlertsService).showError).toHaveBeenCalled();
  });

  it('should get 20 activities', () => {
    component.ngOnInit();
    expect(component.activities.length).toBe(20);
  });

  it('should display an activity if the user has selected the contact ministry in settings', () => {
    component.ngOnInit();
    component.showingAllMinistries = false;
    component.userMinistriesAbbreviations = ['FAKE'];
    const hidingActivity = component.showActivity(component.activities[0].contactMinistryAbbreviation);
    expect(hidingActivity).toEqual(false);
  });

  it('should hide an activity if the user has not selected the contact ministry in settings', () => {
    component.ngOnInit();
    component.showingAllMinistries = false;
    component.userMinistriesAbbreviations = [];
    const hidingActivity = component.showActivity(component.activities[0].contactMinistryAbbreviation);
    expect(hidingActivity).toEqual(true);
  });

  it('should show all activities if the list is not filtered by ministry/ministries', () => {
    component.ngOnInit();
    component.showingAllMinistries = true;
    component.userMinistriesAbbreviations = [];
    const displayedActivities = component.activities.filter(a => {
      return component.showActivity(a.contactMinistryAbbreviation) === false;
    });
    const showingAllActivities = displayedActivities.length === component.activities.length;
    expect(showingAllActivities).toBe(true);
  });

  // tslint:disable-next-line:max-line-length
  it('should not show any activities if the user has not selected any ministries associated with the filtered collection of activities', () => {
    component.ngOnInit();
    component.showingAllMinistries = false;
    component.userMinistriesAbbreviations = ['NOTINCOLLECTION'];
    const displayedActivities = component.activities.filter(a => {
      return component.showActivity(a.contactMinistryAbbreviation) === false;
    });
    const showingAllActivities = displayedActivities.length === component.activities.length;
    expect(showingAllActivities).toBe(false);
  });

  it('should overwrite title and details with hqComments', () => {
    const activity = FakeActivity('**hq title**hq _details_');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('hq title');
    expect(activity.details).toBe('hq details');
  });

  it('should overwrite title with hqComments', () => {
    const activity = FakeActivity('**hq comment**');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('hq comment');
    expect(activity.details).toBe('');
  });

  it('should overwrite details with hqComments', () => {
    const activity = FakeActivity('hq comment');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('title');
    expect(activity.details).toBe('hq comment');
  });
});
