import { TestBed } from '@angular/core/testing';

import { RepairmanService } from './repairman.service';

describe('RepairmanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairmanService = TestBed.get(RepairmanService);
    expect(service).toBeTruthy();
  });
});
