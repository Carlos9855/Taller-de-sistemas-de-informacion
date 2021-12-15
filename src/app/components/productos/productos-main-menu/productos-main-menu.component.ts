import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductoMainDetailComponent } from '../../view-product/producto-main-detail/producto-main-detail.component';
import { HotToastService } from '@ngneat/hot-toast';


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
    private toastService: HotToastService
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
    } ).afterClosed().subscribe(confirm => {
      if(confirm){
        this.toastService.success('Se agrego al carrito',{
          style: {
            border: '1px solid #737378',
            padding: '16px',
            color: '#737378',
            fontWeight: '500'
          },
          iconTheme: {
            primary: '#4ECFAE',
            secondary: '#FFFAEE',
          },
        });
      }
    });

  }
}

