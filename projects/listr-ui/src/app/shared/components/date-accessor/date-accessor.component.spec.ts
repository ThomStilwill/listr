import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAccessorComponent } from './date-accessor.component';

describe('DateAccessorComponent', () => {
  let component: DateAccessorComponent;
  let fixture: ComponentFixture<DateAccessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateAccessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
