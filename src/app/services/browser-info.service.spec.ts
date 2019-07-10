import { TestBed, inject } from '@angular/core/testing';
import { BrowserInfoService } from './browser-info.service';

describe('BrowserInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserInfoService]
    });
  });

  it('should be created', () => {
    const service: BrowserInfoService = TestBed.get(BrowserInfoService);
    expect(service).toBeTruthy();
  });

  it('should inject', inject([BrowserInfoService], (service: BrowserInfoService) => {
    expect(service).toBeTruthy();
  }));

  it('should  return is Internet explorer as false', inject([BrowserInfoService], (service: BrowserInfoService) => {
    expect(service.getBrowser()).toBeFalsy();
  }));

});
