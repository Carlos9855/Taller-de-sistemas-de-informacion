import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMainMenuComponent } from './categories-main-menu.component';

describe('CategoriesMainMenuComponent', () => {
  let component: CategoriesMainMenuComponent;
  let fixture: ComponentFixture<CategoriesMainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesMainMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
