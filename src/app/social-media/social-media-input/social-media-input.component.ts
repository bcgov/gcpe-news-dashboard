import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { NavmenuService } from '../../services/navmenu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component';
import { AddSocialMediaPostModalComponent } from '../add-social-media-post-modal/add-social-media-post-modal.component';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';

// the following readonly names need to match the names from the social media sdk
declare const FB: any;
declare const twttr: any;
declare const instgrm: any;

@Component({
  selector: 'app-social-media-input',
  templateUrl: './social-media-input.component.html',
  styleUrls: ['./social-media-input.component.scss']
})

export class SocialMediaInputComponent implements OnInit, AfterViewInit, OnDestroy {
  socialmedia: SocialMediaPostExtended[];
  selectedSocialMedia: SocialMediaPostExtended[];

  socialmediatypes: SocialMediaType[];
  filterBySocialMediaType: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public nav: NavmenuService,
    private modal: NgbModal,
    private socialMediaService: SocialMediaPostsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.nav.hide();
    this.activatedRoute.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];
    });
    const selectedSocialmediatypes = [];

    this.socialmedia.forEach(post => {
      if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
        selectedSocialmediatypes.push(post.mediaType);
        this.loadWidgets(post.mediaType);
      }
    });
  }

  loadTwitterWidgets() {
    if (twttr.ready()) {
      twttr.widgets.load();
    }
  }

  loadFacebookWidgets() {
    FB.init({
      xfbml: true,
      version: 'v3.2'
    });
    Array.from(document.getElementsByClassName('fb-post')).forEach(function(item) {
      FB.XFBML.parse(item);
   });
  }

  loadInstagramWidgets() {
    instgrm.Embeds.process();
  }

  loadWidgets(mediaType: any) {
    switch (mediaType) {
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

  ngAfterViewInit() {
    const selectedSocialmediatypes = [];

    this.socialmedia.forEach(post => {
      if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
        selectedSocialmediatypes.push(post.mediaType);
        this.loadWidgets(post.mediaType);
      }
    });
  }

  ngOnDestroy() {
    this.nav.show();
  }

  close() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['social-media-input']);
  }

  deleteSocialMediaPost(post: SocialMediaPostExtended) {
    const deleteModal = this.modal.open(DeletePostConfirmationModalComponent, { size: 'lg', centered: true });
    deleteModal.componentInstance.url = post.url;

    deleteModal.result.then((result) => {
      if (result === 'Confirm') {
        if ((post.id !== 'undefined') && (post.id !== null)) {
          this.socialMediaService.deleteSocialMediaPost(post.id).subscribe(
            () => {
              this.close();
            },
            () => {
               alert(`Failed to delete post: ${post.id}`);
            }
          );
        }
      }
    }, (reason) => {
    });

  }

  addSocialMediaPost() {
    const addModal = this.modal.open(AddSocialMediaPostModalComponent, { size: 'lg', centered: true });

    addModal.result.then((result) => {
      if ( result.url !== 'underfined' || result.url !== null ) {
        console.log(result);
        this.socialMediaService.addSocialMediaPost({url: result.url}).subscribe(
          () => {
            this.close();
          },
          () => {
             alert(`Failed to add post`);
          }
        );
      }
      if (result === 'Cancel') {
      }
    }, (reason) => {
    });
  }

}
