import { TestBed } from '@angular/core/testing';

import { SwitchQuartzService } from './switch-quartz.service';

describe('SwitchQuartzService', () => {
  let service: SwitchQuartzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchQuartzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
