import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Producto } from '../models/producto'

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  productList: AngularFireList<any>;
  selectedProduct: Producto = new Producto();
  products: Observable<any[]>

  constructor(public firebase: AngularFireDatabase) { 
    this.productList = firebase.list('/productos')
  }

  insertProduct(product: Producto){
    window.alert("Producto Guardado Correctamente");
    return this.productList.push(
      {
        Name: product.Name,
        Description: product.Description,
        Price: product.Price,
        Model: product.Model,
        Category: product.Category,
        Amount: product.Amount,
        Code: product.Code,
        IsVisible: true});
  }

  getProductList():Observable<Producto[]>{
    this.products = this.productList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .filter(product => product.IsVisible == true),
      )
    );
    return this.products;
    }

  deleteProduct(key){
    this.productList.update(key,{IsVisible: false});
  }

  getKey(){
    return this.productList.snapshotChanges();
  }

  updateProduct(key:string, product: Producto)
  {
    this.productList.update(key,product);
  }

}
