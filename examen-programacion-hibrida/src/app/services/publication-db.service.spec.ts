import { TestBed } from '@angular/core/testing';

import { PublicationDbService } from './publication-db.service';

describe('PublicationDbService', () => {
  let service: PublicationDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
