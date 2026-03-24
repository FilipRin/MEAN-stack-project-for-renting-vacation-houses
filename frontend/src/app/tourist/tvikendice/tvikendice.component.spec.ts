import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvikendiceComponent } from './tvikendice.component';

describe('TvikendiceComponent', () => {
  let component: TvikendiceComponent;
  let fixture: ComponentFixture<TvikendiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvikendiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvikendiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
