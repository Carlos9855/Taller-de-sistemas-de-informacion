import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Grid, GridOptions} from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';
import { localeEs } from 'src/assets/locale.es.js';



@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit{


  public gridOptions: GridOptions;
  public rowData;
  public columnDefs;
  public productsList: Producto [] = [];
  public frameworkComponents: any;
  public quickSearchValue: string = '';

  constructor(
    public productService: ProductoService,
    public dialog: MatDialog,
    private router: Router)
     {}


  ngOnInit():void {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };

    this.getProductsData();
    this.loadData();
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


  loadData(){

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
      { headerName: 'Codigo', field: 'Code', filter:true, sortable:true },
      { headerName: 'Nombre', field: 'Name', filter:true, sortable:true },
      { headerName: 'Modelo', field: 'Model', filter:true, sortable:true },
      { headerName: 'Categoria', field: 'Category', filter:true },
      { headerName: 'Precio', field: 'Price', filter:true},
      { headerName: 'Cantidad', field: 'Amount', filter:true },
      {
        cellRenderer: 'iconRenderer',
        cellRendererParams: {
          onClick: this.editProduct.bind(this),
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

  deleteConfirmation(productInstance){
    this.dialog
    .open(ConfirmationDialogComponent, {data: "¿Seguro que desea eliminar este producto?"})
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.deleteProduct(productInstance.rowData.key);
      }
    });
  }

  deleteProduct(key){
      this.productService.deleteProduct(key);
  }

  onQuickFilterChanged() {
    this.gridOptions.api.setQuickFilter(this.quickSearchValue);
}

  editProduct(item){
    this.productService.selectedProduct.$key = item.rowData.key;
    this.productService.selectedProduct.Description = item.rowData.Description;
    this.productService.selectedProduct.Model = item.rowData.Model;
    this.productService.selectedProduct.Name = item.rowData.Name;
    this.productService.selectedProduct.Price = item.rowData.Price;
    this.productService.selectedProduct.Category = item.rowData.Category;
    this.productService.selectedProduct.Amount = item.rowData.Amount;
    this.productService.selectedProduct.Code = item.rowData.Code;
    this.router.navigate(['create-products']);
  }

}