import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexpageComponent } from './indexpage.component';

describe('IndexpageComponent', () => {
  let component: IndexpageComponent;
  let fixture: ComponentFixture<IndexpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
