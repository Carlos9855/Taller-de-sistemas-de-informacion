import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Producto } from '../models/producto'

@Injectable()

export class ProductoService {

  productList: AngularFireList<any>;
  selectedProduct: Producto = new Producto();

  constructor(public firebase: AngularFireDatabase) { 
   // this.productList = firebase.list('/productos')
  }

  getProducts(){
    return this.productList = this.firebase.list('productos');
  }

  insertProduct(product: Producto){
    this.productList.push({
      Producto: product.Producto,
      Categoria:product.Categoria,
      Precio:product.Precio,
      Modelo:product.Modelo,
      Descripcion:product.Descripcion
    });
    window.alert("Producto Guardado Correctamente");
  }


 updateProduct(product: Producto) {
    this.productList.update(product.$key, {
      Producto: product.Producto,
      Categoria:product.Categoria,
      Precio:product.Precio,
      Modelo:product.Modelo,
      Descripcion:product.Descripcion
    });
   }

   deleteProduct($key:string) {
    this.productList.remove($key);
   }

}
