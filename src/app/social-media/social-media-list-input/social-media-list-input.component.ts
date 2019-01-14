import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavmenuService } from '../../services/navmenu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SocialMediaPost } from 'src/app/view-models/socialMediaPost';
import { SocialMediaPostsService } from '../../services/socialMediaPosts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePostConfirmationModalComponent } from '../delete-post-confirmation-modal/delete-post-confirmation-modal.component';
import { forkJoin, Observable } from 'rxjs';

const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-social-media-list-input',
  templateUrl: './social-media-list-input.component.html',
  styleUrls: ['./social-media-list-input.component.scss']
})

export class SocialMediaListInputComponent implements OnInit, OnDestroy {

  socialMediaPostListForm: FormGroup;
  socialmedialist: SocialMediaPost[] = [];
  constructor(
    public nav: NavmenuService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private socialMediaService: SocialMediaPostsService,
    private modal: NgbModal) {
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
    const formGroup: FormGroup = this.formBuilder.group({
      id: new FormControl(post.id),
      url: new FormControl(post.url, [Validators.required, Validators.pattern(reg)]),
      sortOrder: new FormControl(post.sortOrder)
    });
    return formGroup;
  }

  initFormArray(posts: SocialMediaPost[]) {
    const formArray: FormArray = this.socialMediaPostForms;

    if (posts != null) {
      if (posts.length > 0) {
        posts.map(item => {
          formArray.push(this.createForms(item));
        });
        this.socialMediaPostListForm.setControl('postList', formArray);
      }
    }
  }

  get socialMediaPostForms(): FormArray {
    return this.socialMediaPostListForm.get('postList') as FormArray;
  }

  addSocialMediaPost() {
    this.socialMediaPostForms.insert(0, new FormGroup(
      {
        url: new FormControl('', [Validators.required, Validators.pattern(reg)]),
        sortOrder: new FormControl(0)
      }
    ));
  }

  deleteSocialMediaPost(index: number) {
    const post = this.socialMediaPostForms.at(index).value;

    const modal = this.modal.open(DeletePostConfirmationModalComponent, { size: 'lg' });
    modal.componentInstance.url = post.url;

    modal.result.then((result) => {
      if (result === 'Confirm') {
        this.socialMediaPostForms.removeAt(index);
        if ((post.id !== 'undefined') && (post.id !== null)) {
          this.socialMediaService.deleteSocialMediaPost(post.id).subscribe(
            () => {
              // console.log('delete post id ' + post.id + ' success');
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

  move(shift, currentIndex) {
    const formArray: FormArray = this.socialMediaPostForms;
    let newIndex: number = currentIndex + shift;
    if (newIndex === -1) {
      newIndex = formArray.length - 1;
    } else if (newIndex === formArray.length) {
      newIndex = 0;
    }

    const currentGroup = formArray.at(currentIndex);
    formArray.removeAt(currentIndex);
    formArray.insert(newIndex, currentGroup);
  }

  submit() {
    const formArray: FormArray = this.socialMediaPostForms;
    if (!formArray.valid) {
      /// TODO: if submit failed, do something
      alert('not valid');
      this.close();
      return;
    }
    const updateFns: Observable<SocialMediaPost>[] = [];

    for (let index = 0; index < formArray.length; index++) {
      const postForm = formArray.at(index);
      const post = postForm.value as SocialMediaPost;
      if (post.sortOrder !== index) {
        post.sortOrder = index;
      } else if (!postForm.dirty) {
        continue;
      }

      updateFns.push(post.id ? this.socialMediaService.updateSocialMediaPost(post.id, post)
        : this.socialMediaService.addSocialMediaPost(post));
    }
    if (!updateFns.length) {
      this.close();
      return;
    }
    forkJoin(updateFns).subscribe(
      (results) => {
        this.close();
      },
      (err) => {
        alert('Failed to update or create post - Error: ' + JSON.stringify(err.error));
      }
    );
  }

  get_url(index: number): any {
    return this.socialMediaPostForms.at(index);
  }

  close() {
    this.router.navigate(['social-media-list'], { queryParams: { type: 'All' } });
  }

  ngOnDestroy() {
    this.nav.show();
  }
}

