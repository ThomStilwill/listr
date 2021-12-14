import { TestBed } from '@angular/core/testing';

import { InterComponentService } from './inter-component.service';

describe('InterComponentServiceService', () => {
  let service: InterComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
