import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../shared/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {
  public posts: Post[];
  
  constructor(http: HttpClient, @Inject('BASE_API_URL') baseApiUrl: string) {
    http.get<Post[]>(baseApiUrl + 'api/Posts/Latest/home/default?count=10&api-version=1.0').subscribe(result => {
      this.posts = result;
    }, error => console.error(error));
  }

  ngOnInit() {
  }
}
