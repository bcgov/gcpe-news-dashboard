import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaListInputComponent } from './social-media-list-input.component';

describe('SocialMediaListInputComponent', () => {
  let component: SocialMediaListInputComponent;
  let fixture: ComponentFixture<SocialMediaListInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaListInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
