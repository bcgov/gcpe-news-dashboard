import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-activities-forecast-list',
  templateUrl: './activities-forecast-list.component.html',
  styleUrls: ['./activities-forecast-list.component.scss']
})

export class ActivitiesForecastListComponent implements OnInit {
  private  entrylist:  Array<object> = [];

  constructor(private  apiService:  ApiService) { }

  ngOnInit() {
    this.getPosts();
  }

  public  getPosts(){
    this.apiService.getPosts().subscribe((data:  Array<object>) => {
        this.entrylist  =  data;
        console.log(data);
    });
}
}
