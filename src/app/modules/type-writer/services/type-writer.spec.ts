import { TestBed } from '@angular/core/testing';

import { TypeWriterService } from './type-writer';

describe('TypeWriter', () => {
  let service: TypeWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
