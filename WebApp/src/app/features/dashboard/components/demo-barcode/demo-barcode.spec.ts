import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBarcode } from './demo-barcode';

describe('DemoBarcode', () => {
  let component: DemoBarcode;
  let fixture: ComponentFixture<DemoBarcode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoBarcode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoBarcode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
