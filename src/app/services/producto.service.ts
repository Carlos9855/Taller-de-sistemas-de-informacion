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
    window.alert("Producto Guardado Correctamente");
    this.productList.push({
      nombre: product.nombre,
      categoria:product.categoria,
      precio:product.precio,
      modelo:product.modelo,
      descripcion:product.descripcion
    });
  }


 updateProduct(product: Producto) {
    this.productList.update(product.$key, {
      nombre: product.nombre,
      categoria:product.categoria,
      precio:product.precio,
      modelo:product.modelo,
      descripcion:product.descripcion
    });
   }

   deleteProduct($key:string) {
    this.productList.remove($key);
   }

}
