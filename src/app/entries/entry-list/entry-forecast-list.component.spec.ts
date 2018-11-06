import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntryForecastListComponent } from './entry-forecast-list.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

describe('EntryForecastListComponent', () => {
  let component: EntryForecastListComponent;
  let fixture: ComponentFixture<EntryForecastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule,
      ],
      declarations: [ EntryForecastListComponent ],
      providers: [
        {provide:ApiService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryForecastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
