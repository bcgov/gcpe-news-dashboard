import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SocialMedia } from '../../view-models/social-media';
import { SocialMediaType } from '../../view-models/social-media-type';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { InstagramPost } from '../../view-models/instagram-post';
import { FacebookPost } from '../../view-models/facebook-post';

declare const FB: any;
declare const twttr: any;
declare const TWTTR: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.scss']
})

export class SocialMediaListComponent implements OnInit, AfterViewInit, OnDestroy {
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
  @ViewChild('dataContainerInstagram') dataContainerInstagram: ElementRef;
  @ViewChild('dataContainerFacebook') dataContainerFacebook: ElementRef;

  constructor(private router: ActivatedRoute, private http: HttpClient,
  private apiService:  ApiService, private route: ActivatedRoute, private _router: Router, private elRef: ElementRef) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.init();
    this.loadInstagramWidgets();
    this.loadTwitterWidgets();
    this.loadFacebookWidgets();
  }

  init(){
    this.route.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
      // mockup data for the media types
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
    this.requestInstagramEmbed("https://www.instagram.com/p/BrTJd9yBvVy/?utm_source=ig_web_copy_link");
    //this.requestFacebookEmbed("http://www.facebook.com/BCProvincialGovernment/posts/2456078591077085");
    this.loadInstagramDivs();
    this.apiService.requestInstagramEmbed();
    this.apiService.requestFacebookEmbed();
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

  loadFacebookDiv() {
    //create a new HTMLElement from nativeElement
    var hElement: HTMLElement = this.elRef.nativeElement;
    //now you can simply get your elements with their class name
    var allDivs = hElement.getElementsByClassName('fb-post');
    
    for (var i = 0; i < allDivs.length; i++) {
      (<any>window).FB.init({
        xfbml      : true,
        version    : 'v3.2'
      });
      (<any>window).FB.Event.subscribe('xfbml.ready', function(msg) {
        (<any>window).FB.XFBML.parse(allDivs[i]);
      });
      
      
    }
  
  }

  requestInstagramEmbed(postUrl:string) : any {
    var url = `https://api.instagram.com/oembed?url=${postUrl}&omitscript=true`;
    let result = this.http.get<InstagramPost>(url, {responseType:"json"}).subscribe(data => { 
      console.log(data);
      this.dataContainerInstagram.nativeElement.innerHTML = data.html;
    });
  }
  
  requestFacebookEmbed(postUrl:string) : any {
    var url = `https://www.facebook.com/plugins/post/oembed.json/?url=${postUrl}&omitscript=true`;
    let result = this.http.get<FacebookPost>(url, {responseType:"json"}).subscribe(data => { 
      console.log(data);
      this.dataContainerFacebook.nativeElement.innerHTML = data.html;
    });
    
  }

  loadInstagramDivs(){
    //create a new HTMLElement from nativeElement
    var hElement: HTMLElement = this.elRef.nativeElement;

    //now you can simply get your elements with their class name
    var allDivs = hElement.getElementsByClassName('instagram-post');
    console.log(allDivs);
    for (let i = 0; i < allDivs.length; i++) 
    {
      var url = `https://api.instagram.com/oembed?url=https://www.instagram.com/p/BrTJd9yBvVy/?utm_source=ig_web_copy_link&omitscript=true`;
      let result = this.http.get<InstagramPost>(url, {responseType:"json"}).subscribe(data => { 
        console.log(data);
        allDivs[i].innerHTML = data.html;
      });
    }
  }


  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.router.queryParams.subscribe(val => {
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
          //this.apiService.processEmbeddedInstagramPosts();
          this.loadInstagramWidgets();
          this.loadTwitterWidgets();
          this.loadFacebookDiv();
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
            //this.apiService.processEmbeddedInstagramPosts();
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

  initTwitterWidget() {
    this.twitter = 
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
        }
        if ((<any>window).twttr.ready())
        {
          (<any>window).twttr.widgets.load();
        }
      });
  }

  initFacebookWidget(){
    this.facebook =
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
        }
        (<any>window).FB.init({
          xfbml      : true,
          version    : 'v3.2'
        });
        (<any>window).FB.XFBML.parse();
      });
  }

  initInstagramWidget(){
    this.instagram = 
      this.route.queryParams.subscribe((queryParams: any) => {
        this.filterBy = queryParams.type;
        if (queryParams.type === 'All') {
          this.selectedSocialMedia = this.socialmedia;
        }
        else {
          this.selectedSocialMedia = this.socialmedia.filter(s => s.mediatype === queryParams.type);
        }
        (<any>window).instgrm.Embeds.process();
      });
  }

  
}
