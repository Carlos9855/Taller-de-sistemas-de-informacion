import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneClienteComponent } from './view-one-cliente.component';

describe('ViewOneClienteComponent', () => {
  let component: ViewOneClienteComponent;
  let fixture: ComponentFixture<ViewOneClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOneClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
