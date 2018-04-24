import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPreparationsComponent } from './daily-preparations.component';

describe('DailyPreparationsComponent', () => {
  let component: DailyPreparationsComponent;
  let fixture: ComponentFixture<DailyPreparationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyPreparationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPreparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
