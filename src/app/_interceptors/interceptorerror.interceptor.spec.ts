import { TestBed } from '@angular/core/testing';

import { InterceptorerrorInterceptor } from './interceptorerror.interceptor';

describe('InterceptorerrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorerrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorerrorInterceptor = TestBed.inject(InterceptorerrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
