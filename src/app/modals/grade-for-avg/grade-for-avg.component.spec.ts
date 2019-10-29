import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeForAvgComponent } from './grade-for-avg.component';

describe('GradeForAvgComponent', () => {
  let component: GradeForAvgComponent;
  let fixture: ComponentFixture<GradeForAvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeForAvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeForAvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
