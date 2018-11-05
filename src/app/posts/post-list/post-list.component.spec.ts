import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule
       ],
      declarations: [PostListComponent ],
      providers: [
        {provide:ApiService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
