import { TestBed } from '@angular/core/testing';

import { NaviService } from './navi.service';

describe('NaviService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaviService = TestBed.get(NaviService);
    expect(service).toBeTruthy();
  });
});
