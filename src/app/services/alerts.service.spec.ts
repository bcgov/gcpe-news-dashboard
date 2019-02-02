/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertsService } from './alerts.service';

describe('Service: Alerts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertsService]
    });
  });

  it('should inject', inject([AlertsService], (service: AlertsService) => {
    expect(service).toBeTruthy();
  }));

  it('should remove', inject([AlertsService], (service: AlertsService) => {
    service.showError('message');
    service.remove();
    service.visible.subscribe(visible => {
      expect(visible).toBeFalsy();
    });
    expect(service.message).toBe('');
    expect(service.class).toBe('');
  }));

  it('should show error alert', inject([AlertsService], (service: AlertsService) => {
    service.showError('error message');
    service.visible.subscribe(visible => {
      expect(visible).toBeTruthy();
    });
    expect(service.message).toBe('error message');
    expect(service.class).toBe('alert-danger');
  }));
  
  it('should show info alert', inject([AlertsService], (service: AlertsService) => {
    service.showInfo('info message');
    service.visible.subscribe(visible => {
      expect(visible).toBeTruthy();
    });
    expect(service.message).toBe('info message');
    expect(service.class).toBe('alert-info');
  }));

  it('should show successful alert', inject([AlertsService], (service: AlertsService) => {
    service.showSuccess('success message');
    service.visible.subscribe(visible => {
      expect(visible).toBeTruthy();
    });
    expect(service.message).toBe('success message');
    expect(service.class).toBe('alert-success');
  }));

  it('should show with custom class', inject([AlertsService], (service: AlertsService) => {
    service.show('message', 'custom');
    service.visible.subscribe(visible => {
      expect(visible).toBeTruthy();
    });
    expect(service.message).toBe('message');
    expect(service.class).toBe('custom');
  }));
});
