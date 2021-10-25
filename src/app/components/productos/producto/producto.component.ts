import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// SERVICIO
import { ProductoService } from '../../../services/producto.service';

// CLASE PRODUCTO
import { Producto } from '../../../models/producto';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit{
  
  selectedCategory: string;
  constructor(
    public productoService: ProductoService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(productForm: NgForm)
  {
    
    if(this.productoService.selectedProduct.$key != null){
     
      //  productForm.value.$key = this.productoService.selectedProduct.$key;
        this.productoService.updateProduct(this.productoService.selectedProduct.$key,productForm.value); 
    } 
    else{
        this.productoService.insertProduct(productForm.value);
    }
    this.resetForm(productForm);
  }

  goToViewProducts(){
    this.resetForm();
    this.router.navigate(['/view-products']);
  }

  resetForm(productForm?: NgForm)
  {
    if(productForm!=null)
    {
      productForm.reset();
    }
      this.productoService.selectedProduct = new Producto();
  }


}