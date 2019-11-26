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
import { AuthService } from 'src/app/_auth/auth.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { AppConfigService } from 'src/app/app-config.service';
import { of } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { FakeActivitiesData } from 'src/app/test-helpers/activities';
import { mockAuth } from 'src/app/test-helpers/mock-auth';
import { SnowplowService } from '../../services/snowplow.service';
import { DatePipe } from '@angular/common';

describe('ActivityForecastListComponent', () => {
  let component: ActivityForecastListComponent;
  let fixture: ComponentFixture<ActivityForecastListComponent>;
  let alerts: AlertsService;
  let div: HTMLElement;

  class MockActivity {
    title = 'title';
    details = 'details';
    hqComments;

    constructor(hqComments: string) {
      this.hqComments = hqComments;
    }
  }

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
        DatePipe,
        SnowplowService,
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
    component.userMinistriesForFilteringActivities = ['fake'];
    const hidingActivity = component.showActivity(component.activities[0].contactMinistryKey);
    expect(hidingActivity).toEqual(false);
  });

  it('should hide an activity if the user has not selected the contact ministry in settings', () => {
    component.ngOnInit();
    component.showingAllMinistries = false;
    component.userMinistriesForFilteringActivities = [];
    const hidingActivity = component.showActivity(component.activities[0].contactMinistryKey);
    expect(hidingActivity).toEqual(true);
  });

  it('should show all activities if the list is not filtered by ministry/ministries', () => {
    component.ngOnInit();
    component.showingAllMinistries = true;
    component.userMinistriesForFilteringActivities = [];
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
    component.userMinistriesForFilteringActivities = ['not-in-collection'];
    const displayedActivities = component.activities.filter(a => {
      return component.showActivity(a.contactMinistryKey) === false;
    });
    const showingAllActivities = displayedActivities.length === component.activities.length;
    expect(showingAllActivities).toBe(false);
  });

  it('should not overwrite title and details with hqComments if hqComments have a default value of **', () => {
    const activity = <Activity> new MockActivity('**');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('title');
    expect(activity.details).toBe('details');
  });

  it('should overwrite title and details with hqComments with bolded text followed by regular text', () => {
    const activity = <Activity> new MockActivity('**hq title** hq details');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('hq title');
    expect(activity.details).toBe('hq details');
  });

  it('should overwrite title and details with hqComments regular text followed by bolded text', () => {
    const activity = <Activity> new MockActivity('hq details **hq title**');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('hq details hq title');
  });

  it('should overwrite title with bold-only hqComments', () => {
    const activity = <Activity> new MockActivity('**hq comment**');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('hq comment');
  });

  it('should overwrite title with un-bolded hqComments', () => {
    const activity = <Activity> new MockActivity('hq comment');
    component.overwriteTitleDetailsFromHqComments(activity);
    expect(activity.title).toBe('hq comment');
  });

  it('should be an all day activity if all day is set to true', () => {
    const activity = <Activity> new MockActivity('');
    activity.isAllDay = true;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('All Day');
  });

  it('should display the release date time if it is populated', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 10, 0, 0, 0);
    activity.nrDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('10 am');
  });

  it('should display the release date time as HH:MM if it is populated and it is not top of the hour', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 10, 30, 0, 0);
    activity.nrDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('10:30 am');
  });

  it('should display the release date time as Midnight if it is populated and it is 12:00 am', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 0, 0, 0, 0);
    activity.nrDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('Midnight');
  });

  it('should display the release date time as Noon if it is populated and it is 12:00 pm', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 12, 0, 0, 0);
    activity.nrDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('Noon');
  });

  it('should display Time TBD if the activity is not confirmed and it starts at 8 am and ends at 6 pm', () => {
    const activity = <Activity> new MockActivity('');
    activity.nrDateTime = null; // has to be done explicitly to mimic what's done in real data
    activity.isConfirmed = false;
    const startDate = new Date(2019, 11, 26, 8, 0, 0, 0);
    const endDate = new Date(2019, 11, 26, 18, 0, 0, 0);
    activity.startDateTime = startDate;
    activity.endDateTime = endDate;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('Time TBD');
  });

  it('should display the start date time if it is populated', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 10, 0, 0, 0);
    activity.nrDateTime = null;
    activity.startDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('10 am');
  });

  it('should display the start date time as HH:MM if it is populated and it is not top of the hour', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 10, 30, 0, 0);
    activity.nrDateTime = null;
    activity.startDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('10:30 am');
  });

  it('should display the start date time as Midnight if it is populated and it is 12:00 am', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 0, 0, 0, 0);
    activity.nrDateTime = null;
    activity.startDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('Midnight');
  });

  it('should display the start date time as Noon if it is populated and it is 12:00 pm', () => {
    const activity = <Activity> new MockActivity('');
    const d = new Date(2019, 11, 26, 12, 0, 0, 0);
    activity.nrDateTime = null;
    activity.startDateTime = d;
    const displayTime = component.getFormattedStartDate(activity);
    expect(displayTime).toBe('Noon');
  });
});
