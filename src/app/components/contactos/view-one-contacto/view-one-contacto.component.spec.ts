import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneContactoComponent } from './view-one-contacto.component';

describe('ViewOneContactoComponent', () => {
  let component: ViewOneContactoComponent;
  let fixture: ComponentFixture<ViewOneContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOneContactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
