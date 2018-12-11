import { TestBed } from '@angular/core/testing';

import { ThemesService } from './themes.service';

describe('ThemesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemesService = TestBed.get(ThemesService);
    expect(service).toBeTruthy();
  });
});
