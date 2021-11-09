import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';
import { localeEs } from 'src/assets/locale.es.js';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-add-category',
  templateUrl: './view-add-category.component.html',
  styleUrls: ['./view-add-category.component.scss']
})
export class ViewAddCategoryComponent implements OnInit {

  public gridOptions: GridOptions;
  public rowData;
  public columnDefs;
  public categoriesList: Category [] = [];
  public frameworkComponents: any;
  public quickSearchValue: string = '';
  public file: File;
  public urlImage: Promise<string>;

  constructor(public categoryService: CategoryService,
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };

    this.getCategoriesData();
    this.loadData();
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

  
  onQuickFilterChanged() {
    this.gridOptions.api.setQuickFilter(this.quickSearchValue);
}

   loadData()
   {
      this.gridOptions = {
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

      this.columnDefs = [
        { headerName: 'Nombre', field: 'Name', filter:true, sortable:true },
        { headerName: 'Url_Imagen', field: 'UrlImage', filter:true, sortable:true },
        {
          cellRenderer: 'iconRenderer',
          cellRendererParams: {
            onClick: this.editCategory.bind(this),
            icon: 'editar.png',
            tooltip: 'Editar',
            color: '#7AC074'
          },
          width: 80,
          minWidth: 80
        },
        {
          cellRenderer: 'iconRenderer',
          cellRendererParams: {
            onClick: this.deleteConfirmation.bind(this),
            icon: 'eliminar.png',
            tooltip: 'Eliminar',
            color: '#CA8181'
          },
          width: 80,
          minWidth: 80
        },
      ];
   }

   deleteConfirmation(categoryInstance){
    console.log(categoryInstance.rowData.IsVisible);
    this.dialog
    .open(ConfirmationDialogComponent, {data: "¿Seguro que desea eliminar esta categoria?"})
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.deleteCategory(categoryInstance.rowData.key);
      }
    });
  }

  deleteCategory(key: string){
    this.categoryService.deleteCategory(key);
  }

  onSubmit(categoryForm){
    // console.log(categoryForm.values.UrlImage)  

    if(this.categoryService.selectedCategory.$key != null){
        this.categoryService.updateCategory(this.categoryService.selectedCategory.$key,categoryForm.value); 
    } 
    else{
        this.categoryService.insertProduct(categoryForm.value);
    }
    this.resetForm(categoryForm);
  }

  resetForm(categoryForm?: NgForm)
  {
    if(categoryForm != null)
    categoryForm.reset();
      this.categoryService.selectedCategory = new Category();
      this.file = undefined;
  }

  editCategory(categoryInstance){
    this.categoryService.selectedCategory.$key = categoryInstance.rowData.key;
    this.categoryService.selectedCategory.Name = categoryInstance.rowData.Name;
    this.categoryService.selectedCategory.UrlImage = categoryInstance.rowData.UrlImage;
  }


  onUpload(e){
     this.file = e.target.files[0];
     console.log(this.file)
     this.urlImage = this.categoryService.uploadFile(this.file);
     this.urlImage.then((a) => {this.categoryService.selectedCategory.UrlImage = a})
  }
}
