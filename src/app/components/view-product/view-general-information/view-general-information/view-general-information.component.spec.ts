import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGeneralInformationComponent } from './view-general-information.component';

describe('ViewGeneralInformationComponent', () => {
  let component: ViewGeneralInformationComponent;
  let fixture: ComponentFixture<ViewGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
