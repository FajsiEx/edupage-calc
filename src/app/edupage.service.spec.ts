import { TestBed } from '@angular/core/testing';

import { EdupageService } from './edupage.service';

describe('EdupageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EdupageService = TestBed.get(EdupageService);
    expect(service).toBeTruthy();
  });
});
