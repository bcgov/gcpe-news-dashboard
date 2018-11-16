import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HqDashboardSubMenuComponent } from './hq-dashboard-sub-menu.component';

describe('HqDashboardSubMenuComponent', () => {
  let component: HqDashboardSubMenuComponent;
  let fixture: ComponentFixture<HqDashboardSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqDashboardSubMenuComponent ]
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
