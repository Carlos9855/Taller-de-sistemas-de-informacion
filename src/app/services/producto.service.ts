import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Producto } from '../models/producto'

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  productList: AngularFireList<any>;
  selectedProduct: Producto = new Producto();
  products: Observable<any[]>;
  urlImage: string;

  constructor(public firebase: AngularFireDatabase,
    private storage: AngularFireStorage) { 
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
        Brand: product.Brand,
        UrlImage: product.UrlImage,
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

  async uploadFile(file: File):Promise<string>  {
    if (file) {
      const id = Math.random().toString(36).substring(2);
      const filePath = `products-images/category_${id}`;
      const task = await this.storage.upload(filePath, file);
      const url = await task.ref.getDownloadURL();
      return url;
    } else {alert('Please select an image'); }
  }

}
