import { TestBed } from '@angular/core/testing';

import { UsergaurdGuard } from './usergaurd.guard';

describe('UsergaurdGuard', () => {
  let guard: UsergaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsergaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
