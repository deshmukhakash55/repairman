import { TestBed } from '@angular/core/testing';

import { RepairsService } from './repairs.service';

describe('RepairsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairsService = TestBed.get(RepairsService);
    expect(service).toBeTruthy();
  });
});
