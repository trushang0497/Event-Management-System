import { TestBed } from '@angular/core/testing';

import { GenerateEventService } from './generate-event.service';

describe('GenerateEventService', () => {
  let service: GenerateEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
