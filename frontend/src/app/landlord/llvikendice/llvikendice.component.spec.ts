import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlvikendiceComponent } from './llvikendice.component';

describe('LlvikendiceComponent', () => {
  let component: LlvikendiceComponent;
  let fixture: ComponentFixture<LlvikendiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlvikendiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlvikendiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
