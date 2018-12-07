import { Component, OnInit, Inject } from '@angular/core';
import { Post } from '../../view-models/news/post';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {
  public posts: Post[];

  constructor(private router: Router, private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.posts = data['posts'];
    });
  }

  getPosts() {
    this.apiService.getPosts().subscribe((data) => {
      this.posts = data;
    }, error => console.error(error));
  }
}
