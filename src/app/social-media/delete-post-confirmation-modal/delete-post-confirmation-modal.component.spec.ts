import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletePostConfirmationModalComponent } from './delete-post-confirmation-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';
import { FakeSocialMediaPostsData } from '../../test-helpers/social-media-posts';
import { SocialMediaPostComponent } from '../social-media-post/social-media-post.component';

describe('DeletePostConfirmationModalComponent', () => {
  let component: DeletePostConfirmationModalComponent;
  let fixture: ComponentFixture<DeletePostConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeletePostConfirmationModalComponent,
        SocialMediaPostComponent
      ],
      providers: [
       NgbActiveModal,
       SocialMediaRenderService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePostConfirmationModalComponent);
    component = fixture.componentInstance;
    // this isnt being found and this test doesn't do anything
    // component.postExt = FakeSocialMediaPostsData(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
