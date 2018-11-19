import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Entry } from '../../shared/entry';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry-forecast-list',
  templateUrl: './entry-forecast-list.component.html',
  styleUrls: ['./entry-forecast-list.component.scss']
})

export class EntryForecastListComponent implements OnInit {
  public entrylist: Entry[];
  public daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.entrylist = data['entrylist'];
    });
  }

  getEntries() {
    this.apiService.getEntries().subscribe((data) => {
      this.entrylist = data;
    }, error => console.error(error));
  }
}
