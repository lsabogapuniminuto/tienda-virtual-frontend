import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TransaccionService } from './transaccion.service';

describe('TransaccionService', () => {
  let service: TransaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TransaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
