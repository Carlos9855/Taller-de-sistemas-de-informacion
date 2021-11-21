import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMainMenuComponent } from './productos-main-menu.component';

describe('ProductosMainMenuComponent', () => {
  let component: ProductosMainMenuComponent;
  let fixture: ComponentFixture<ProductosMainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosMainMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
