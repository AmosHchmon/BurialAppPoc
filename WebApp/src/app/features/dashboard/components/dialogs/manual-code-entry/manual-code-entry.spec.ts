import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCodeEntry } from './manual-code-entry';

describe('ManualCodeEntry', () => {
  let component: ManualCodeEntry;
  let fixture: ComponentFixture<ManualCodeEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualCodeEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualCodeEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
