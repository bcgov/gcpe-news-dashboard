import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HqDashboardSubMenuComponent } from './hq-dashboard-sub-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

describe('HqDashboardSubMenuComponent', () => {
  let component: HqDashboardSubMenuComponent;
  let fixture: ComponentFixture<HqDashboardSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterModule
      ],
      declarations: [
        HqDashboardSubMenuComponent
      ],
      providers: [
        { provide: 'BASE_API_URL', useValue: environment.apiUrl },
        { provide: 'BASE_HUB_API_URL', useValue: environment.hubApiUrl }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqDashboardSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
