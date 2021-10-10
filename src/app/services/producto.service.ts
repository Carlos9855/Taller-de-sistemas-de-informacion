import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

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
    return this.productList.push(product);
  }

}
