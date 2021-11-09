import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddCategoryComponent } from './view-add-category.component';

describe('ViewAddCategoryComponent', () => {
  let component: ViewAddCategoryComponent;
  let fixture: ComponentFixture<ViewAddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAddCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
