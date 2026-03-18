import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDeceasedBug } from './selected-deceased-bug';

describe('SelectedDeceasedBug', () => {
  let component: SelectedDeceasedBug;
  let fixture: ComponentFixture<SelectedDeceasedBug>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedDeceasedBug]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedDeceasedBug);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
