import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Employee } from '../models/employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();

  constructor(public firebase: AngularFireDatabase) { 
    this.employeeList = firebase.list('/employees');
  }

  insertProduct(employee: Employee){
    return this.employeeList.push(employee);
  }

  getEmployeesList(){
    return this.employeeList.valueChanges();
  }

}
