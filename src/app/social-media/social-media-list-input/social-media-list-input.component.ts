import { Component, OnInit } from '@angular/core';
import { NavmenuService } from '../../services/navmenu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SocialMediaPost } from 'src/app/view-models/socialMediaPost';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component';

const reg : string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-social-media-list-input',
  templateUrl: './social-media-list-input.component.html',
  styleUrls: ['./social-media-list-input.component.scss']
})

export class SocialMediaListInputComponent implements OnInit {

  socialMediaPostListForm: FormGroup;
  socialmedialist: SocialMediaPost[] = [];
  
  constructor(public nav: NavmenuService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private socialMediaService: SocialMediaPostsService, private modal: NgbModal) {
  }

  ngOnInit() {
    this.nav.hide();
    this.route.data.subscribe(data => {
      this.socialmedialist = data['socialmedia'];
    });

    this.socialMediaPostListForm = new FormGroup({
      postList: this.formBuilder.array([])
    });
    this.initFormArray(this.socialmedialist);
  }

  createForms(post): FormGroup {
    let formGroup: FormGroup = this.formBuilder.group({
      id: new FormControl(post.id),
      url: new FormControl(post.url, [Validators.required, Validators.pattern(reg)]),
      order: new FormControl(post.order)
    });
    return formGroup;
  }

  initFormArray(posts: SocialMediaPost[]) {
    const formArray = this.socialMediaPostListForm.get('postList') as FormArray;

    if (posts != null) {
      if (posts.length > 0) {
        posts.map(item => {
          formArray.push(this.createForms(item));
        });
        this.socialMediaPostListForm.setControl('postList', formArray);
      }
    }
  }

  get socialMediaPosts(): FormArray {
    return this.socialMediaPostListForm.get('postList') as FormArray;
  }

  addSocialMediaPost() {
    this.socialMediaPosts.push(new FormGroup(
      {
        id: new FormControl(),
        url: new FormControl('', [Validators.required, Validators.pattern(reg)]),
        order: new FormControl()
      }
    ));
  }

  deleteSocialMediaPost(index: number) {
    let post = this.socialMediaPosts.at(index).value;

    const modal = this.modal.open(DeletePostConfirmationModalComponent, { size: 'lg' });
    modal.componentInstance.url = post.url;

    modal.result.then((result) => {
      if (result == 'Confirm') {
        this.socialMediaPosts.removeAt(index);
        if ((post.id !== 'undefined') && (post.id !== null)) {
          this.socialMediaService.deleteSocialMediaPost(post.id).subscribe(
            () => {
              // console.log('delete post id ' + post.id + ' success');
            },
            () => {
              // console.log("Failed to delete post " + post.id);
            }
          );
        }
      }
    }, (reason) => {
    });

  }

  move(shift, currentIndex) {

    let newIndex: number = currentIndex + shift;
    if (newIndex === -1) {
      newIndex = this.socialMediaPosts.length - 1;
    } else if (newIndex === this.socialMediaPosts.length) {
      newIndex = 0;
    }

    const currentGroup = this.socialMediaPosts.at(currentIndex);
    this.socialMediaPosts.removeAt(currentIndex);;
    this.socialMediaPosts.insert(newIndex, currentGroup)
  }

  submit() {
    if (this.socialMediaPosts.valid) {
      this.socialMediaPosts.value.forEach((post, index) => {
        post = post as SocialMediaPost;
        post.sortOrder = index;
        if (post.id != null) {

          this.socialMediaService.updateSocialMediaPost(post.id, post).subscribe(
            () => {
              // console.log('update success: ' + post.id);
            },
            () => {
              // console.log('Failed to update psot: ' + post.id);
            }
          );
        } else {
          delete post["id"];
          this.socialMediaService.addSocialMediaPost(post).subscribe(
            () => {
              // console.log('create success');
            },
            () => {
              // console.log('Failed to create post');
            }
          )
        }
      });
      this.router.navigate(['social-media-list'], { queryParams: { type: 'All' } });
    } else {
      /// TODO: if submit failed, do something
      // console.log('not valid');
    }
  }

  get_url(index: number): any{
    let arrayControl = this.socialMediaPostListForm.get('postList') as FormArray;
    return arrayControl.at(index);
  }

  close() {
    this.router.navigate(['social-media-list'], { queryParams: { type: 'All' } });
  }

  ngOnDestroy() {
    this.nav.show();
  }
}

