import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// SERVICIO
import { ProductoService } from '../../../services/producto.service';

// CLASE PRODUCTO
import { Producto } from '../../../models/producto';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit{
  
  public categoryList: Category[] = [];

  constructor(
    public productoService: ProductoService,
    private router: Router,
    public categoryService: CategoryService
    ) { }

  ngOnInit() {
    this.getCategoryData()
  }

  getCategoryData(){
    this.categoryService.getCategoriesList()
    .subscribe( product => {
        this.categoryList = product;
    },
    error => {
      var errorMessage = error.message && error.status == 0 ? "Error al contactar al servidor" : error.error.message || "Error al cargar empleados";
    });   
  }


  onSubmit(productForm: NgForm)
  {
    if(this.productoService.selectedProduct.$key != null){
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