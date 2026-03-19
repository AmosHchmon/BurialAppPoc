import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTransport } from './active-transport';

describe('ActiveTransport', () => {
  let component: ActiveTransport;
  let fixture: ComponentFixture<ActiveTransport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveTransport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveTransport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
