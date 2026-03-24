import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminregistrationsComponent } from './adminregistrations.component';

describe('AdminregistrationsComponent', () => {
  let component: AdminregistrationsComponent;
  let fixture: ComponentFixture<AdminregistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminregistrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminregistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
