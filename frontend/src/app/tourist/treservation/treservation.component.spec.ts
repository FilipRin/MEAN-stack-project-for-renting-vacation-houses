import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreservationComponent } from './treservation.component';

describe('TreservationComponent', () => {
  let component: TreservationComponent;
  let fixture: ComponentFixture<TreservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
