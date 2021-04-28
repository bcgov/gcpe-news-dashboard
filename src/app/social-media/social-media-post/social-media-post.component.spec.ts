import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialMediaPostComponent } from './social-media-post.component';

describe('SocialMediaPostComponent', () => {
  let component: SocialMediaPostComponent;
  let fixture: ComponentFixture<SocialMediaPostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
