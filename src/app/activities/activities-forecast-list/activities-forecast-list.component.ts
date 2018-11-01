import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Entry } from '../../shared/entry'

@Component({
  selector: 'app-activities-forecast-list',
  templateUrl: './activities-forecast-list.component.html',
  styleUrls: ['./activities-forecast-list.component.scss']
})

export class ActivitiesForecastListComponent implements OnInit {
  public  entrylist;
  public sampleEntry: Entry;
  public daysofWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private  apiService:  ApiService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.apiService.getPosts().subscribe((data) => {
      this.entrylist = data;
      this.sampleEntry = data[0];
      console.log(this.sampleEntry);
    }, error => console.error(error));
  }

  getDaysofWeek(){
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
}
