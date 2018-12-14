import { TestBed } from '@angular/core/testing';

import { NavmenuService } from './navmenu.service';

describe('NavmenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavmenuService = TestBed.get(NavmenuService);
    expect(service).toBeTruthy();
  });
});
