import { Component, OnInit } from '@angular/core';

import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';


import { IconRendererComponent } from '../icon-renderer/icon-renderer.component';
import { localeEs } from 'src/assets/locale.es.js';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Grid, GridOptions} from 'ag-grid-community';


@Component({
  selector: 'app-menu-categorias',
  templateUrl: './menu-categorias.component.html',
  styleUrls: ['./menu-categorias.component.scss']
})
export class MenuCategoriasComponent implements OnInit {

  public gridOptionsForProducts: GridOptions;
  public columnDefsForProducts;
  public productsList: Producto [] = [];
  public frameworkComponentsForProducts: any;

  public gridOptionsForCategories: GridOptions;
  public columnDefsForCategories;
  public categoriesList: Category [] = [];
  public frameworkComponentsForCategories: any;

  constructor(
    public productService: ProductoService,
    public categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router)
     {}


  ngOnInit():void {
    this.frameworkComponentsForProducts = {
      iconRenderer: IconRendererComponent,
    };
    this.frameworkComponentsForCategories = {
      iconRenderer: IconRendererComponent,
    };

    //this.getProductsData();
    this.getCategoryData();
    //this.loadDataProductData();
    this.loadDataCategoryData();
  }

  getCategoryData(){
    this.categoryService.getCategoriesList()
    .subscribe( category=>{
      this.categoriesList=category;
    },
    error => {
      var errorMessage = error.message && error.status == 0 ? "Error al contactar al servidor" : error.error.message || "Error al cargar empleados";
    });
  }

  getProductsData(){
    this.productService.getProductList()
    .subscribe( product => {
        this.productsList = product;
    },
    error => {
      var errorMessage = error.message && error.status == 0 ? "Error al contactar al servidor" : error.error.message || "Error al cargar empleados";
    });
  }


  loadDataProductData(){
    this.gridOptionsForProducts = {
      domLayout: 'autoHeight',
      pagination: true,
      paginationPageSize: 20,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        params.api.collapseAll();
      },
      onGridSizeChanged: (params) => {
        params.api.collapseAll();
      },
      defaultColDef: {
        resizable: true
      },
      localeTextFunc: (key: string, defaultValue: string) => localeEs[key] || defaultValue
    }

    this.columnDefsForProducts = [
      { headerName: 'Codigo', field: 'Code', filter:true, sortable:true },
      { headerName: 'Nombre', field: 'Name', filter:true },
      { headerName: 'Modelo', field: 'Model', filter:true},
      { headerName: 'Categoria', field: 'Category', filter:true },
      { headerName: 'Precio', field: 'Price', filter:true, sortable:true},
      { headerName: 'Cantidad', field: 'Amount', filter:true, sortable:true },
    ];
  }

  loadDataCategoryData(){
    this.gridOptionsForCategories = {
      domLayout: 'autoHeight',
      pagination: true,
      paginationPageSize: 20,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        params.api.collapseAll();
      },
      onGridSizeChanged: (params) => {
        params.api.collapseAll();
      },
      defaultColDef: {
        resizable: true
      },
      

      localeTextFunc: (key: string, defaultValue: string) => localeEs[key] || defaultValue
    }

    this.columnDefsForCategories = [     
      { headerName: 'Imagen', field: 'UrlImage', autoHeight: true, cellRenderer: ({ value }) => `<img style="height: 200px; width:200px" src=${value} />` },
      { headerName: 'Nombre', field: 'Name', filter:true },
    ];
  }


}
