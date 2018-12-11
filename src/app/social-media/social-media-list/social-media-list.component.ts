import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SocialMedia } from '../../view-models/social-media';
import { SocialMediaType } from '../../view-models/social-media-type';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.scss']
})

@Injectable()
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
  constructor(@Inject(DOCUMENT) private document: any, private elementRef: ElementRef, private router: ActivatedRoute, 
  private apiService:  ApiService, private route: ActivatedRoute, private  httpClient:  HttpClient, private _router: Router) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.init();
    this.selectDiv();
    this.initTwitterWidget();
    this.initInstagramWidget();
    this.initFacebookWidget();
  }
  selectDiv() {
    var hElement: HTMLElement = this.elementRef.nativeElement;
    this.allTwitterDivs = hElement.getElementsByClassName('twitter-tweet');
    console.log(this.allTwitterDivs);
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
      FB.init({
        xfbml      : true,
        version    : 'v3.2'
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
        console.log("param changed");

        if ((<any>window).twttr.ready())
        {
          
          (<any>window).twttr.widgets.load();
          //console.log('loaded');
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
        console.log("param changed");
        FB.init({
          xfbml      : true,
          version    : 'v3.2'
        });
        FB.XFBML.parse();
 
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
    var that = this;
    var url = 'https://api.instagram.com/oembed?url=http://www.instagram.com/p/Bqs5nnBBQRc/';

    /*
    this.http.get('https://api.instagram.com/oembed?url=https://www.instagram.com/p/Bqs5nnBBQRc/', 'callback').subscribe(data => {
      console.log(data);
      //this.test = data.json();
    });
*/
    this.httpClient.get('https://api.instagram.com/oembed?url=https://www.instagram.com/p/Bqs5nnBBQRc/&omitscript=true').subscribe(data => {
      console.log(data);
      this.test = data;
    });

    FB.init({
      xfbml      : true,
      version    : 'v3.2'
    });
  }

  ngAfterViewInit() {
    this.initTwitterWidget();
    this.initInstagramWidget();
    this.initFacebookWidget();
  }

  getURL(url: string) {
    //return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  UpdateSocialMediaTypeFilter(newSocialMediaType: string){
    this.filterBy = newSocialMediaType;
  }

  updateFBurl(id, url){
    //this.myId.nativeElement.insertAdjacentHTML('beforeend', url)
    if (id=='1')
    {
      //this.myId.nativeElement.innerHTML='<div class="fb-post" data-href='+ url +' data-width="500" data-show-text="false"></div>';
    }
    else
    {
     // this.myId2.nativeElement.innerHTML='<div class="fb-post" data-href='+ url +' data-width="500" data-show-text="false"></div>';
    }
    //this.myId.nativeElement.innerHTML='<div class="fb-post" data-href='+ url +' data-width="500" data-show-text="false"></div>';
  }

  ngOnDestroy() {
    //this.twitter.unsubscribe();
    console.log('destroy');
    
  }   
  
}
