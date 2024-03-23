import { TestBed } from '@angular/core/testing';

import { UiEditFormService } from './uiEditForm.service';

describe('FormService', () => {
  let service: UiEditFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiEditFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
