import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPostComponent } from './social-media-post.component';

describe('SocialMediaPostComponent', () => {
  let component: SocialMediaPostComponent;
  let fixture: ComponentFixture<SocialMediaPostComponent>;

  beforeEach(async(() => {
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
