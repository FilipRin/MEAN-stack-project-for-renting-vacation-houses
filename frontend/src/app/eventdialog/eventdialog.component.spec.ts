import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdialogComponent } from './eventdialog.component';

describe('EventdialogComponent', () => {
  let component: EventdialogComponent;
  let fixture: ComponentFixture<EventdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
