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
  today: number = new Date().valueOf();
  msInaDay: number = 24 * 3600 * 1000;

  constructor(private apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      var inst = this;
      var todayDow = new Date().getDay();
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
    var weekDay = WeekDay[this.getStartDate(i).getDay()];
    return weekDay == "Sunday" ? "Sat/Sun" : weekDay;
  }

  getStartDay(i: number) {
    var startDateTime: Date = this.getStartDate(i);
    var day:number = startDateTime.getDate();
    return startDateTime.getDay() == 0 ? new Date(startDateTime.valueOf() - this.msInaDay).getDate() + "/" + day : day;
  }

  getStartDate(i: number) {
    return this.activitiesPerDays[i].length != 0 ? this.activitiesPerDays[i][0].startDateTime : new Date(this.today + i * this.msInaDay);
  }

  /*getActivities() {
    this.apiService.getActivityForecast().subscribe((data) => {
      this.activityList = data;
    }, error => console.error(error));
  }*/
}
