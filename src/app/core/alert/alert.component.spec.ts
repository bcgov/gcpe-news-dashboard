/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlertComponent } from './alert.component';
import { AlertsService } from 'src/app/services/alerts.service';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alerts: AlertsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [AlertsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    alerts = TestBed.get(AlertsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert if alert is active', () => {
    alerts.showError('error somethings broken!');
    expect(component.alertVisible).toBeTruthy();
    expect(component.alertMessage).toBe('error somethings broken!');
  });

  it('should hide alert if alert isnt active', () => {
    alerts.remove();
    expect(component.alertVisible).toBeFalsy();
  });

  it('should remove alerts', () => {
    alerts.showError('error somethings broken!');
    expect(component.alertVisible).toBeTruthy();
    component.clearAlerts();
    expect(component.alertVisible).toBeFalsy();
  });
});
