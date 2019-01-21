import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialMediaPostModalComponent } from './add-social-media-post-modal.component';

describe('AddSocialMediaPostModalComponent', () => {
  let component: AddSocialMediaPostModalComponent;
  let fixture: ComponentFixture<AddSocialMediaPostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSocialMediaPostModalComponent ]
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
