import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryList: AngularFireList<any>;
  categories: Observable<any[]>
  selectedCategory: Category = new Category();
  urlImage: string;

  constructor(public firebase: AngularFireDatabase,
    private storage: AngularFireStorage) 
    { 
      this.categoryList = firebase.list('/categories');
    }

  insertProduct(category: Category){
    return this.categoryList.push({
      Name: category.Name,
      UrlImage: category.UrlImage,
      IsVisible: true
    });
  }

  getCategoriesList():Observable<Category[]>{
    this.categories = this.categoryList.snapshotChanges().pipe(
      map(changes =>   
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .filter(employee => employee.IsVisible == true),
      )
    );
    return this.categories;
  }

  deleteCategory(key){
    this.categoryList.update(key,{IsVisible: false});
  }

  updateCategory(key:string, employee: Category)
  {
    this.categoryList.update(key,employee);
  }

  async uploadFile(file: File):Promise<string>  {
    if (file) {
      const id = Math.random().toString(36).substring(2);
      const filePath = `categories-images/category_${id}`;
      const task = await this.storage.upload(filePath, file);
      const url = await task.ref.getDownloadURL();
      return url;
    } else {alert('Please select an image'); }
  }
}
