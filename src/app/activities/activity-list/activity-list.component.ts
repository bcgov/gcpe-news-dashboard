import { Component, OnInit } from '@angular/core';
import { Activities } from '../../shared/mock-activities';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
   
  activities = Activities;
  
  constructor() { }

  ngOnInit() {
  }
}
