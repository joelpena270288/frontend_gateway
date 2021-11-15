import { TestBed } from '@angular/core/testing';

import { PeripheralDeviceService } from './peripheral-device.service';

describe('PeripheralDeviceService', () => {
  let service: PeripheralDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeripheralDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
