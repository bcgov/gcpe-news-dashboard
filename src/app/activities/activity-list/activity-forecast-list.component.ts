import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import { Activity } from '../../view-models/activity';
import { ActivatedRoute, Router } from '@angular/router';
import { WeekDay } from '@angular/common';
import { AlertsService } from 'src/app/services/alerts.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  constructor(private route: ActivatedRoute,  appConfig: AppConfigService, private alerts: AlertsService, private utils: UtilsService) {
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
  }

  showActivity(contactMinistryKey: string): boolean {
    if (this.showingAllMinistries) {
      return false; // don't hide the activities if we're showing all ministries, can't use ngIf with ngFor so binding to Hidden instead
    }

    return !this.utils.includes(this.userMinistriesForFilteringActivities, contactMinistryKey);
  }

  overwriteTitleDetailsFromHqComments(activity: Activity) {
    let hqComments: string = activity.hqComments;
    if (hqComments) {
      while (true) {
        let marker = '**';
        let startPos: number = hqComments.indexOf(marker);
        if (startPos === -1) {
          marker = '_';
          startPos = hqComments.indexOf(marker);
        }
        if (startPos === -1) { break; }
        const endPos: number = hqComments.indexOf(marker, startPos + marker.length);
        if (endPos === -1) { return; } // invalid

        const toMarkdown: string = hqComments.substring(startPos + marker.length, endPos);
        if (startPos === 0) {
          activity.title = toMarkdown;
          hqComments = hqComments.substring(endPos + marker.length);
        } else {
          hqComments = hqComments.substring(0, startPos) + toMarkdown + hqComments.substring(endPos + marker.length);
        }
      }
      activity.details = hqComments;
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
    if (this.activitiesPerDays[i].length !== 0) { return this.activitiesPerDays[i][0].startDateTime; }
    if (i + this.today.getDay() > 6) { i++; } // for the week-end
    return new Date(this.today.valueOf() + i * this.msInaDay);
  }
}
