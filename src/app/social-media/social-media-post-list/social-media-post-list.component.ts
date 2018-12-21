import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { SocialMediaApiService } from '../../services/socialMediaPostsWrapper.service';
import { SocialMediaPostViewModel } from '../../view-models/social-media-post';

declare const FB: any;
declare const twttr: any;
declare const TWTTR: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-post-list',
  templateUrl: './social-media-post-list.component.html',
  styleUrls: ['./social-media-post-list.component.scss']
})
export class SocialMediaPostListComponent implements OnInit, AfterViewInit, OnDestroy {
  socialmedia: SocialMediaPostViewModel[];
  selectedSocialMedia: SocialMediaPostViewModel[];

  private twitter: any;
  private facebook: any;
  private instagram: any;

  socialmediatypes: SocialMediaType[];
  filterBy: string = 'All';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private socialMediaService: SocialMediaPostsService, private apiService: SocialMediaApiService) { 

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.init();
    this.loadInstagramWidgets();
    this.loadTwitterWidgets();
    this.loadFacebookWidgets();
    
  }

  ngOnInit() {
    this.init();
  }

  init(){
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      console.log(this.socialmedia);
    });
    this.activatedRoute.data.subscribe(data => {
      this.socialmediatypes = data['socialmediatype'];
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams.type === 'All') {
        this.selectedSocialMedia = this.socialmedia;
      }
      else {
        this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === queryParams.type);
      }

    });
    console.log(this.selectedSocialMedia);
  }

  loadTwitterWidgets(){
    if ((<any>window).twttr.ready())
    {
      (<any>window).twttr.widgets.load();
    }
  }

  loadFacebookWidgets(){
    (<any>window).FB.init({
      xfbml      : true,
      version    : 'v3.2'
    });
    (<any>window).FB.Event.subscribe('xfbml.ready', function(msg) {
      (<any>window).FB.XFBML.parse();
    });
    
  }

  loadInstagramWidgets(){
    (<any>window).instgrm.Embeds.process();
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(val => {
      this.activatedRoute.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
          this.loadInstagramWidgets();
          this.loadTwitterWidgets();
          this.loadFacebookWidgets();
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediaType === queryParams.type);
          switch (queryParams.type)
          {
            case 'Facebook':
            this.loadFacebookWidgets();
            break;
            case 'Twitter':
            this.loadTwitterWidgets();
            break;
            case 'Instagram':
            this.loadInstagramWidgets();
          }
        }
      });
    });
  }

  UpdateSocialMediaTypeFilter(newSocialMediaType: string){
    this.filterBy = newSocialMediaType;
  }

  ngOnDestroy() {
    console.log('destroy');
  
    //this.twitter.unsubscribe();
    //this.facebook.unsubscribe();
    //this.instagram.unsubscribe();
  }   

}
