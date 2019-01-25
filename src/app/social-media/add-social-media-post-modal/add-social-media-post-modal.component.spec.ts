import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AddSocialMediaPostModalComponent } from './add-social-media-post-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaRenderService } from '../../services/socialMediaRender.service';

describe('AddSocialMediaPostModalComponent', () => {
  let component: AddSocialMediaPostModalComponent;
  let fixture: ComponentFixture<AddSocialMediaPostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSocialMediaPostModalComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        NgbActiveModal,
        SocialMediaRenderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocialMediaPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
