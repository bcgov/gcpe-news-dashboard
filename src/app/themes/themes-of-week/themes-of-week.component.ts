import { Component, OnInit } from '@angular/core';
import { Message } from '../../view-models/message';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-themes-of-week',
  templateUrl: './themes-of-week.component.html',
  styleUrls: ['./themes-of-week.component.scss']
})
export class ThemesOfWeekComponent implements OnInit {

  themes: Message[];
  highlightedTheme: Message;

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute, private alerts: AlertsService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if(typeof data['themes'] === 'undefined' || data['themes'] === null) {
        this.alerts.showError('An error occurred while retrieving themes');
        return;
      };
      this.themes = data['themes'].filter((theme) => !theme.isHighlighted && theme.isPublished);
      this.highlightedTheme = data['themes'].find((theme) => theme.isHighlighted && theme.isPublished);
    });
  }
}
