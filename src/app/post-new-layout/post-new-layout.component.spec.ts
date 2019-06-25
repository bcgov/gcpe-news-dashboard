import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewLayoutComponent } from './post-new-layout.component';

describe('PostNewLayoutComponent', () => {
  let component: PostNewLayoutComponent;
  let fixture: ComponentFixture<PostNewLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNewLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
