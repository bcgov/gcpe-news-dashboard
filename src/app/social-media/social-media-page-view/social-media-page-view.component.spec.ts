import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPageViewComponent } from './social-media-page-view.component';

describe('SocialMediaPageViewComponent', () => {
  let component: SocialMediaPageViewComponent;
  let fixture: ComponentFixture<SocialMediaPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaPageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
