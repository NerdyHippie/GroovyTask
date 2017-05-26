import { TestBed, inject } from '@angular/core/testing';

import { CheckOffService } from './check-off.service';

describe('CheckOffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckOffService]
    });
  });

  it('should ...', inject([CheckOffService], (service: CheckOffService) => {
    expect(service).toBeTruthy();
  }));
});
