import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMainDetailComponent } from './producto-main-detail.component';

describe('ProductoMainDetailComponent', () => {
  let component: ProductoMainDetailComponent;
  let fixture: ComponentFixture<ProductoMainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoMainDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoMainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
