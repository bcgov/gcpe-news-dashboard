import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Entry } from '../../shared/entry'

@Component({
  selector: 'app-entry-forecast-list',
  templateUrl: './entry-forecast-list.component.html',
  styleUrls: ['./entry-forecast-list.component.scss']
})

export class EntryForecastListComponent implements OnInit {
  public entrylist: Entry[];
  public daysofWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private  apiService:  ApiService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.apiService.getEntries().subscribe((data) => {
      this.entrylist = data;
    }, error => console.error(error));
  }

  getDaysofWeek(){
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
}
