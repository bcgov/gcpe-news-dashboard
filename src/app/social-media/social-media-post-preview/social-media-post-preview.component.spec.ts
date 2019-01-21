import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPostPreviewComponent } from './social-media-post-preview.component';

describe('SocialMediaPostPreviewComponent', () => {
  let component: SocialMediaPostPreviewComponent;
  let fixture: ComponentFixture<SocialMediaPostPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaPostPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaPostPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
