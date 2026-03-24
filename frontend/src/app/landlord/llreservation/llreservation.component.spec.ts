import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlreservationComponent } from './llreservation.component';

describe('LlreservationComponent', () => {
  let component: LlreservationComponent;
  let fixture: ComponentFixture<LlreservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlreservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
