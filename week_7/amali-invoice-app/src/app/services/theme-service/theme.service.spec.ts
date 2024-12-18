import { TestBed } from '@angular/core/testing';

import { ThemeServiceService } from './theme.service';

describe('ThemeServiceTsService', () => {
  let service: ThemeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
