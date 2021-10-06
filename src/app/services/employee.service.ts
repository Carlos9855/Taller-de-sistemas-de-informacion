import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Employee } from '../models/employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  productList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();

  constructor(public firebase: AngularFireDatabase) { 
    this.productList = firebase.list('/employees')
  }

  insertProduct(employee: Employee){
    return this.productList.push(employee);
  }

}
