import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Activity } from '../../view-models/activity';
import { ActivatedRoute, Router } from '@angular/router';
import { WeekDay } from '@angular/common';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-activity-forecast-list',
  templateUrl: './activity-forecast-list.component.html',
  styleUrls: ['./activity-forecast-list.component.scss']
})

export class ActivityForecastListComponent implements OnInit {
  public activitiesPerDays: Activity[][] = [[], [], [], [], [], []]; // just 5 + 1 for the week-end
  today: Date = new Date();
  msInaDay: number = 24 * 3600 * 1000;
  public userMinistriesAbbreviations: Array<string> = [];
  showingAllMinistries = false;
  filterByMinistryAbbreviations: string;
  activities: Activity[] = [];

  constructor(private router: Router, private apiService:  ApiService, private route: ActivatedRoute, private alerts: AlertsService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (typeof data['activities'] === 'undefined' || data['activities'] === null) {
        this.alerts.showError('An error occurred while retrieving activities');
        return;
      }

      if (typeof data['userMinistriesAbbreviations'] === 'undefined' || data['userMinistryAbbreviations'] === null) {
        this.alerts.showError('An error occurred while retrieving your ministries');
        return;
      }

      this.activities = data['activities'];

      let todayDow = this.today.getDay();
      if (todayDow === 6) { todayDow = 0; } // group Sunday with Saturday
      this.activities.forEach(v => {
        v.startDateTime = new Date(v.startDateTime);
        let dow = v.startDateTime.getDay();
        if (dow === 6) { dow = 0; } // group Sunday with Saturday
        this.activitiesPerDays[dow >= todayDow ? dow - todayDow : dow + 6 - todayDow].push(v);
      });

      this.userMinistriesAbbreviations = data['userMinistriesAbbreviations'];

      this.route.queryParams.subscribe((queryParams: any) => {
        if (!queryParams.ministries || queryParams.ministries === 'All') {
          this.showingAllMinistries = true;
        } else {
          this.showingAllMinistries = false;
        }
        this.filterByMinistryAbbreviations = queryParams.type;
      });
    });
  }

  showActivity(abbrev: string): boolean {
    if (this.showingAllMinistries) {
      return false; // don't hide the activities if we're showing all ministries, can't use ngIf with ngFor so binding to Hidden instead
    }
    return !this.userMinistriesAbbreviations.includes(abbrev);
  }

  getStartDow(i: number) {
    const dow: number = this.getStartDate(i).getDay();
    return dow !== 0 && dow !== 6 ? WeekDay[dow] : 'Sat/Sun';
  }

  getStartDay(i: number) {
    const startDateTime: Date = this.getStartDate(i);
    let day: string = startDateTime.getDate().toString();
    const dow: number = startDateTime.getDay();
    if (dow === 0 || dow === 6) {
      if (dow === 0) {
        day = new Date(startDateTime.valueOf() - this.msInaDay).getDate() + '/' + day;
      } else {
        day += '/' + new Date(startDateTime.valueOf() + this.msInaDay).getDate();
      }
    }
    return day; // + "(" + (startDateTime.getMonth() + 1) + ")";
  }

  getStartDate(i: number) {
    if (this.activitiesPerDays[i].length !== 0) { return this.activitiesPerDays[i][0].startDateTime; }
    if (i + this.today.getDay() > 6) { i++; } // for the week-end
    return new Date(this.today.valueOf() + i * this.msInaDay);
  }
}
