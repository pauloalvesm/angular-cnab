import { TestBed } from '@angular/core/testing';

import { CnabService } from './cnab.service';

describe('CnabService', () => {
  let service: CnabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CnabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
