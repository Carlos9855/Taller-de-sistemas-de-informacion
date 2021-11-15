import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';

@Component({
  selector: 'app-categories-main-menu',
  templateUrl: './categories-main-menu.component.html',
  styleUrls: ['./categories-main-menu.component.scss']
})
export class CategoriesMainMenuComponent implements OnInit {
  public categoriesList: Category [] = [];
  public frameworkComponents: any;
  constructor(public categoryService: CategoryService,
    private router: Router,) { }

  ngOnInit(): void {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };

    this.getCategoriesData();
  }

  getCategoriesData(){
    this.categoryService.getCategoriesList()
    .subscribe( category => {
        this.categoriesList = category;
    },
    error => {
      var errorMessage = error.message && error.status == 0 ? "Error al contactar al servidor" : error.error.message || "Error al cargar empleados";
    });
  }

  goToSomePage(){
    this.router.navigate(['/control-panel']);
  }

}
