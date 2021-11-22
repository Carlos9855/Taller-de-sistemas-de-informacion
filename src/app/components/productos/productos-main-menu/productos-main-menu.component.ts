import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductoMainDetailComponent } from '../../view-product/producto-main-detail/producto-main-detail.component';


@Component({
  selector: 'app-productos-main-menu',
  templateUrl: './productos-main-menu.component.html',
  styleUrls: ['./productos-main-menu.component.scss']
})
export class ProductosMainMenuComponent implements OnInit {

  public productsList: Producto [] = [];
  public frameworkComponents: any;
  constructor(
    public productService: ProductoService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

ngOnInit(): void {
  this.frameworkComponents = {
    iconRenderer: IconRendererComponent,
  };

  this.getProductsData();
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

goToSomePage(product){
  this.dialog.open(ProductoMainDetailComponent,
    {
     data: product,
     width: '100vw',
     height: '90vh',
    } );

  }
}

