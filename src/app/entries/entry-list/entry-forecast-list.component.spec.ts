import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryForecastListComponent } from './entry-forecast-list.component';

describe('ActivitiesForecastListComponent', () => {
  let component: EntryForecastListComponent;
  let fixture: ComponentFixture<EntryForecastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryForecastListComponent ]
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
