import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesForecastListComponent } from './activities-forecast-list.component';

describe('ActivitiesForecastListComponent', () => {
  let component: ActivitiesForecastListComponent;
  let fixture: ComponentFixture<ActivitiesForecastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesForecastListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesForecastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
