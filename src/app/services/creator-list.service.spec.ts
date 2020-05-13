import { TestBed } from '@angular/core/testing';

import { CreatorListService } from './creator-list.service';

describe('CreatorListService', () => {
  let service: CreatorListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatorListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
