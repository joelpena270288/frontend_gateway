import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralDeviceComponent } from './peripheral-device.component';

describe('PeripheralDeviceComponent', () => {
  let component: PeripheralDeviceComponent;
  let fixture: ComponentFixture<PeripheralDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripheralDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
