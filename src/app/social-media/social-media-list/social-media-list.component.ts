import { Component, OnInit, ElementRef, AfterViewInit, Inject, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SocialMedia } from '../../view-models/social-media';
import { SocialMediaType } from '../../view-models/social-media-type';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.scss']
})

export class SocialMediaListComponent implements OnInit, AfterViewInit, OnDestroy   {
  private twitter: any;
  private facebook: any;
  private instagram: any;

  allTwitterDivs: any;

  socialmedia: SocialMedia[];
  selectedSocialMedia: SocialMedia[];
  socialmediatypes: SocialMediaType[];
  filterBy: string = 'All';
  domSanitizer: DomSanitizer;

  test: any;
  selectedType: string;
  constructor(private router: ActivatedRoute, 
  private apiService:  ApiService, private route: ActivatedRoute, private  httpClient:  HttpClient, private _router: Router) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.init();
    this.loadInstagramWidgets();
    this.loadFacebookWidgets();
    
    this.loadTwitterWidgets();
  }

  init(){
    this.route.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      // mockup data for the media types
      this.socialmedia.forEach(function (item, i, list) {
        if (item.url.search('facebook.com') >= 0) {
          item.mediatype = 'Facebook';
        }
        else if (item.url.search('twitter.com') >= 0) {
          item.mediatype = 'Twitter';
        }
        else {
          item.mediatype = 'Instagram';
        }
      });
      
    });

    this.route.queryParams.subscribe((queryParams: any) => {
      if (queryParams.type === 'All') {
        this.selectedSocialMedia = this.socialmedia;
      }
      else {
        this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
      }

    });

    console.log(this.selectedSocialMedia);

    this.route.data.subscribe(data => {
      this.socialmediatypes = data['socialmediatype'];
    });

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
    (<any>window).FB.XFBML.parse();
  }
  loadInstagramWidgets(){
    (<any>window).instgrm.Embeds.process();
  }
  initTwitterWidget() {
    this.twitter = this.router.queryParams.subscribe(val => {
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
        }
  
      });

        if ((<any>window).twttr.ready())
        {
          (<any>window).twttr.widgets.load();
        }
 
    });
  }

  initFacebookWidget(){
    this.facebook = this.router.queryParams.subscribe(val => {
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
        }
  
      });
        (<any>window).FB.init({
          xfbml      : true,
          version    : 'v3.2'
        });
        (<any>window).FB.XFBML.parse();
 
    });
  }
  initInstagramWidget(){
    this.instagram = this.router.queryParams.subscribe(val => {
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
        }
  
      });
     (<any>window).instgrm.Embeds.process();
    });
  }

  ngOnInit() {
    this.init();
    //this.initFacebookWidget();
  }

  ngAfterViewInit() {
    this.router.queryParams.subscribe(val => {
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
          this.loadFacebookWidgets();
          this.loadInstagramWidgets();
          this.loadTwitterWidgets();
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
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
/*
    this.loadFacebookWidgets();
    this.loadInstagramWidgets();
    this.loadTwitterWidgets();
    */
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
