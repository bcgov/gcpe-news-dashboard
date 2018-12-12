import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Activity } from '../../view-models/activity';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-forecast-list',
  templateUrl: './activity-forecast-list.component.html',
  styleUrls: ['./activity-forecast-list.component.scss']
})

export class ActivityForecastListComponent implements OnInit {
  public activityList: Activity[];
  public daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.activityList = data['activityList'];
    });
  }

  getActivities() {
    this.apiService.getActivityForecast().subscribe((data) => {
      this.activityList = data;
    }, error => console.error(error));
  }
}
