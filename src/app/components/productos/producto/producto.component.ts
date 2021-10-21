import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// SERVICIO
import { ProductoService } from '../../../services/producto.service';

// CLASE PRODUCTO
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  constructor(public productoService: ProductoService) { }

  ngOnInit() {
    this.productoService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm)
  {
   if(productForm.value.$key!=null){
      this.productoService.updateProduct(productForm.value); 
   } 
    else{
      this.productoService.insertProduct(productForm.value);
   }
      
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.productoService.selectedProduct = new Producto();
  }
}
