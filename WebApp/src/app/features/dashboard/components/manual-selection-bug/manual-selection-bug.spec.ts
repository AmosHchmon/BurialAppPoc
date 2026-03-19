import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSelectionBug } from './manual-selection-bug';

describe('ManualSelectionBug', () => {
  let component: ManualSelectionBug;
  let fixture: ComponentFixture<ManualSelectionBug>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualSelectionBug]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualSelectionBug);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
