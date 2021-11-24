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
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit{
  
  public categoryList: Category[] = [];
  public file: File;
  public urlImage: Promise<string>;

  constructor(
    public productoService: ProductoService,
    public categoryService: CategoryService,
    public dialog: MatDialogRef<ProductoComponent>
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
    this.closeDialogTrue();
  }


  onUpload(e){
    this.file = e.target.files[0];
    console.log(this.file)
    this.urlImage = this.productoService.uploadFile(this.file);
    this.urlImage.then((a) => {console.log(a)})
    this.urlImage.then((a) => {this.productoService.selectedProduct.UrlImage = a})
 }


 closeDialogTrue(){
  this.dialog.close(true);
}


closeDialogFalse(){
  this.dialog.close(false);
}

}