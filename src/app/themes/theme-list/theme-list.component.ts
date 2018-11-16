import { Component, OnInit } from '@angular/core';
import { Theme } from '../../shared/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  themes: Theme[];
  selectedThemes: Theme[];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.themes = data['themes'];
    });

    // mockup data for the theme list
    this.themes.forEach(function (item, i, list) {
      if (i%2 == 0)
      {
        item.type = 'Published';
      }
      else
      {
        item.type = 'Drafts';
      }
    });

    this.route.queryParams.subscribe((queryParams:any) => {
      if (queryParams.type === 'All')
      {
        this.selectedThemes = this.themes;
      }
      else
      {
        this.selectedThemes = this.themes.filter( s => s.type === queryParams.type );
      }
     });

  }

}
