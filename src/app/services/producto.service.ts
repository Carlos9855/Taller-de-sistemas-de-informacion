import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

import { Producto } from '../models/producto'

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  productList: AngularFireList<any>;
  selectedProduct: Producto = new Producto();

  constructor(public firebase: AngularFireDatabase) { 
    this.productList = firebase.list('/productos')
  }

  insertProduct(product: Producto){
    window.alert("Producto Guardado Correctamente");
    return this.productList.push(product);
  }
  getProductList(){
    return this.productList.valueChanges();
  }

  deleteProduct(key){
    this.productList.remove(key);
  }

  getKey(){
    return this.productList.snapshotChanges();
  }

  updateProduct(key:string, product: Producto)
  {
    this.productList.update(key,product);
    //this.productList.update(product.$key,product);
  }

}
