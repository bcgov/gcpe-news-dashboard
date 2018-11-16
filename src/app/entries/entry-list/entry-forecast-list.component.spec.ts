import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntryForecastListComponent } from './entry-forecast-list.component';
import { RouterModule } from '@angular/router';
import { HqDashboardSubMenuComponent } from '../../core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('EntryForecastListComponent', () => {
  let component: EntryForecastListComponent;
  let fixture: ComponentFixture<EntryForecastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule,
        HttpClientModule
      ],
      declarations: [ 
        EntryForecastListComponent,
        HqDashboardSubMenuComponent
      ],
      providers: [
        { provide: 'BASE_API_URL', useValue: environment.apiUrl }
      ],
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
