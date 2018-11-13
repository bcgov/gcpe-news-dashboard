import { Component, OnInit } from '@angular/core';
import { Theme } from '../shared/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  public themes: Theme[];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.themes = data['themes'];
      console.log(data);
    });
  }

  getThemes() {
    this.apiService.getThemes().subscribe((data) => {
      this.themes = data;
    }, error => console.error(error));
  }

}
