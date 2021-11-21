import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';

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
  private router: Router
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

goToSomePage(){
  this.router.navigate(['/control-panel']);
}
}
