import { Component, OnInit } from '@angular/core';
import { Message } from '../../view-models/message';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {
  themes: Message[];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (typeof this.route.queryParams['type'] === 'undefined') {
      this.router.navigate(['/themes'], { queryParams: { type: 'Published' }});
    }
    this.route.data.subscribe(data => {
      this.themes = data['themelist'];
    });
  }

  navigateToTheme(id) {
    this.router.navigate([`/theme/edit/${id}`]);
  }
}
