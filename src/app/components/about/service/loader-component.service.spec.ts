import { TestBed } from '@angular/core/testing';

import { LoaderComponentService } from './loader-component.service';

describe('LoaderComponentService', () => {
  let service: LoaderComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
