import { TestBed } from '@angular/core/testing';

import { OlympiadService } from './olympiad.service';

describe('OlympiadService', () => {
  let service: OlympiadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlympiadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
