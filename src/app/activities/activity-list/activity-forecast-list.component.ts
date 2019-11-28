import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import { Activity } from '../../view-models/activity';
import { ActivatedRoute, Router } from '@angular/router';
import { WeekDay } from '@angular/common';
import { AlertsService } from 'src/app/services/alerts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SnowplowService } from '../../services/snowplow.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-forecast-list',
  templateUrl: './activity-forecast-list.component.html',
  styleUrls: ['./activity-forecast-list.component.scss']
})

export class ActivityForecastListComponent implements OnInit {
  public activitiesPerDays: Activity[][] = [[], [], [], [], [], []]; // just 5 + 1 for the week-end
  today: Date = new Date();
  msInaDay: number = 24 * 3600 * 1000;
  public userMinistriesForFilteringActivities: Array<string> = [];
  showingAllMinistries = false;
  filterActivitiesByUserMinistries: string;
  activities: Activity[] = [];

  private BASE_HUB_URL: string;

  constructor(
    private route: ActivatedRoute,
    appConfig: AppConfigService,
    private alerts: AlertsService,
    private utils: UtilsService,
    private snowplowService: SnowplowService,
    private datePipe: DatePipe) {
    this.BASE_HUB_URL = appConfig.config.HUB_URL;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (typeof data['activities'] === 'undefined' || data['activities'] === null) {
        this.alerts.showError('An error occurred while retrieving activities');
        return;
      }

      if (typeof data['userMinistries'] === 'undefined' || data['userMinistries'] === null) {
        this.alerts.showError('An error occurred while retrieving your ministries');
        return;
      }

      this.activities = data['activities'];

      let todayDow = this.today.getDay();
      if (todayDow === 6) { todayDow = 0; } // group Sunday with Saturday


      data['activities'].forEach(v => {
        this.overwriteTitleDetailsFromHqComments(v);

        v.startDateTime = new Date(v.startDateTime);
        let dow = v.startDateTime.getDay();
        if (dow === 6) { dow = 0; } // group Sunday with Saturday
        this.activitiesPerDays[dow >= todayDow ? dow - todayDow : dow + 6 - todayDow].push(v);
      });

      this.userMinistriesForFilteringActivities = data['userMinistries'];

      this.route.queryParams.subscribe((queryParams: any) => {
        if (!queryParams.ministries || queryParams.ministries === 'All') {
          this.showingAllMinistries = true;
        } else {
          this.showingAllMinistries = false;
        }
        this.filterActivitiesByUserMinistries = queryParams.type;
      });
    });
    this.snowplowService.trackPageView();
  }

  showActivity(contactMinistryKey: string): boolean {
    if (this.showingAllMinistries) {
      return false; // don't hide the activities if we're showing all ministries, can't use ngIf with ngFor so binding to Hidden instead
    }

    return !this.utils.includes(this.userMinistriesForFilteringActivities, contactMinistryKey);
  }

  overwriteTitleDetailsFromHqComments(activity: Activity) {
    const hqComments: string = activity.hqComments;
    if (hqComments) {

      // hqSection being === 4 means not assigned to a section of the look ahead
      if (hqComments === '**' && !activity.isConfidential && activity.hqSection !== 4) { return; }

      activity.details = null;
      activity.title = null;

      const nthIndex = (haystack, needle, position) => {
        const len = haystack.length;
        let idx = -1;
        while (position-- && idx++ < len) {
            idx = haystack.indexOf(needle, idx);
            if (idx < 0) {
              break;
            }
        }
        return idx;
      };

      // bolded text surrounded by asterisks followed by text
      let pattern = /\*{2}(.*?)\*{2}(.+)/g;
      let matches = pattern.exec(hqComments);
      if (matches) {
        activity.title = matches[1].trim();
        const startPos = nthIndex(hqComments, '**', 2);
        activity.details = hqComments.substring(startPos, hqComments.length).replace(/\*/g, '').trim();
        return;
      }

      // bold only
      pattern = /^\*{2}(.*?)\*{2}$/g;
      matches = pattern.exec(hqComments);
      if (matches) {
        activity.title = matches[1];
        return;
      }

      // text followed by bolded text
      pattern = /(.+)\*{2}(.*?)\*{2}/g;
      matches = pattern.exec(hqComments);
      if (matches) {
        activity.title = `${matches[1].trim()} ${matches[2].replace(/\*/g, '').trim()}`;
        return;
      }

      // any un-bolded text
      pattern = /(.*)/g;
      matches = pattern.exec(hqComments);
      if (matches) {
        activity.title = matches[1].trim();
        return;
      }
   }
  }

  getStartDow(i: number) {
    const dow: number = this.getStartDate(i).getDay();
    if (dow === 0) {
      if (i === 0) { return 'Sun/Sat'; } // Sunday and showing the following Saturday
    } else if (dow !== 6) {
      return WeekDay[dow];
    }
    return 'Sat/Sun';
  }

  getStartDay(i: number) {
    const startDateTime: Date = this.getStartDate(i);
    let day: string = startDateTime.getDate().toString();
    const dow: number = startDateTime.getDay();
    if (dow === 0 || dow === 6) {
      const weekendOtherDate = new Date(startDateTime.valueOf() + (dow === 0 && i === 0 ? 6 : 1) * this.msInaDay);
      day += '/' + weekendOtherDate.getDate();
    }
    return day; // + "(" + (startDateTime.getMonth() + 1) + ")";
  }

  getStartDate(i: number) {
    if (i + this.today.getDay() > 6) { i++; } // for the week-end
    return new Date(this.today.valueOf() + i * this.msInaDay);
  }

  getFormattedStartDate(activity: Activity): String {
    // all day activity
    if (activity.isAllDay === true) {
      return 'All Day';
    }

    // release date time is filled in
    if (activity.nrDateTime !== null) {
      const releaseDate = this.datePipe.transform(activity.nrDateTime, 'shortTime').toLowerCase();

      if (releaseDate.indexOf(':00') > -1) {
         const formattedReleaseDate = releaseDate.replace(':00', '');

        if (formattedReleaseDate === '12 pm') {
          return 'Noon';
        }

        if (formattedReleaseDate === '12 am') {
          return 'Midnight';
        }

        return formattedReleaseDate;
      } else {
        return releaseDate;
      }
    }

    // activity is between 8 am and 6 pm and is not confirmed
    if (activity.isConfirmed === false
      && this.datePipe.transform(activity.startDateTime, 'shortTime').toLowerCase().indexOf(':00') > -1
      && this.datePipe.transform(activity.endDateTime, 'shortTime').toLowerCase().indexOf(':00') > -1
      && this.datePipe.transform(activity.startDateTime, 'shortTime').toLowerCase().replace(':00', '') === '8 am'
      && this.datePipe.transform(activity.endDateTime, 'shortTime').toLowerCase().replace(':00', '') === '6 pm') {
      return 'Time TBD';
    }

    // default start date case
    const startDate = this.datePipe.transform(activity.startDateTime, 'shortTime').toLowerCase();
    if (startDate.indexOf(':00') > -1) {
      const formattedStartDate = startDate.replace(':00', '');

        if (formattedStartDate === '12 pm') {
          return 'Noon';
        }

        if (formattedStartDate === '12 am') {
          return 'Midnight';
        }

        return formattedStartDate;
    }

    return this.datePipe.transform(activity.startDateTime, 'shortTime').toLowerCase();
  }
}
