import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneEmployeeComponent } from './view-one-employee.component';

describe('ViewOneEmployeeComponent', () => {
  let component: ViewOneEmployeeComponent;
  let fixture: ComponentFixture<ViewOneEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOneEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
