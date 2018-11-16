import { Component, OnInit } from '@angular/core';
import { Theme } from '../../shared/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themes: Theme[];
  public selectedThemes: Theme[];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.themes = data['themes'];
    });

    // mockup data for the media types
    for (var i=0; i<this.themes.length;i++)
    {
      if (i%2 == 0)
      {
        this.themes[i].type = 'Published';
      }
      else
      {
        this.themes[i].type = 'Drafts';
      }
    }

    this.route.queryParams.subscribe((queryParams:any) => {
      console.log(queryParams.type);
      if (queryParams.type === 'All')
      {
        this.selectedThemes = this.themes;
      }
      else
      {
        this.selectedThemes = this.themes.filter(s=>s.type === queryParams.type);
      }
      
      console.log(this.selectedThemes);
     });

  }

}
