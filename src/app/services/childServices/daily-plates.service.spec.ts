import { TestBed, inject } from '@angular/core/testing';

import { DailyPlatesService } from './daily-plates.service';

describe('DailyPlatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyPlatesService]
    });
  });

  it('should be created', inject([DailyPlatesService], (service: DailyPlatesService) => {
    expect(service).toBeTruthy();
  }));
});
