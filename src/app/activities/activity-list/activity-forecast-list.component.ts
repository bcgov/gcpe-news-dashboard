import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Activity } from '../../view-models/activity';
import { ActivatedRoute } from '@angular/router';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-activity-forecast-list',
  templateUrl: './activity-forecast-list.component.html',
  styleUrls: ['./activity-forecast-list.component.scss']
})

export class ActivityForecastListComponent implements OnInit {
  public activitiesPerDays: Activity[][] = [[], [], [], [], [], []]; // just 5 + 1 for the week-end
  today: Date = new Date();
  msInaDay: number = 24 * 3600 * 1000;

  constructor(private apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      var inst = this;
      var todayDow = this.today.getDay();
      if (todayDow == 6) todayDow = 0; // group Sunday with Saturday
      data['activities'].forEach(v => {
        v.startDateTime = new Date(v.startDateTime);
        var dow = v.startDateTime.getDay();
        if (dow == 6) dow = 0; // group Sunday with Saturday
        inst.activitiesPerDays[dow >= todayDow ? dow - todayDow : dow + 6 - todayDow].push(v);
      });
    });
  }
  getStartDow(i: number) {
    var dow: number = this.getStartDate(i).getDay();
    return dow != 0 && dow != 6 ? WeekDay[dow] : "Sat/Sun";
  }

  getStartDay(i: number) {
    var startDateTime: Date = this.getStartDate(i);
    var day: string = startDateTime.getDate().toString();
    var dow: number = startDateTime.getDay();
    if (dow == 0 || dow == 6) {
      if (dow == 0) day = new Date(startDateTime.valueOf() - this.msInaDay).getDate() + "/" + day;
      else day+= "/" + new Date(startDateTime.valueOf() + this.msInaDay).getDate();
    }
    return day;// + "(" + (startDateTime.getMonth() + 1) + ")";
  }

  getStartDate(i: number) {
    if (this.activitiesPerDays[i].length != 0) return this.activitiesPerDays[i][0].startDateTime;
    if (i + this.today.getDay() > 6) i++; // for the week-end
    return new Date(this.today.valueOf() + i * this.msInaDay);
  }

  /*getActivities() {
    this.apiService.getActivityForecast().subscribe((data) => {
      this.activityList = data;
    }, error => console.error(error));
  }*/
}
