import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { SocialMediaPostExtended } from '../../view-models/social-media-post-extended';
import { NavmenuService } from '../../services/navmenu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component';
import { AddSocialMediaPostModalComponent } from '../add-social-media-post-modal/add-social-media-post-modal.component';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';

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
    private socialMediaService: SocialMediaPostsService,
    private socialMediaRenderService: SocialMediaRenderService) {
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
        this.socialMediaRenderService.loadWidgets(post.mediaType);
      }
    });
  }

  ngAfterViewInit() {
    const selectedSocialmediatypes = [];

    this.socialmedia.forEach(post => {
      if (selectedSocialmediatypes.indexOf(post.mediaType) === -1) {
        selectedSocialmediatypes.push(post.mediaType);
        this.socialMediaRenderService.loadWidgets(post.mediaType);
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
    deleteModal.componentInstance.postExt = post;

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
