import { TestBed } from '@angular/core/testing';

import { SchoolServiceService } from './school-service.service';

describe('SchoolServiceService', () => {
  let service: SchoolServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
