import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee'
import { map, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeList: AngularFireList<any>;
  employees: Observable<any[]>
  selectedEmployee: Employee = new Employee();

  constructor(public firebase: AngularFireDatabase) { 
    this.employeeList = firebase.list('/employees');
  }

  insertProduct(employee: Employee){
    return this.employeeList.push({
      Ci: employee.Ci,
      Name: employee.Name,
      LastName: employee.LastName,
      BirthdayDate: employee.BirthdayDate,
      Phone: employee.Phone,
      Email: employee.Email,
      Cellphone: employee.Cellphone,
      Address: employee.Address,
      IsVisible: true
    });
  }

  getEmployeesList():Observable<Employee[]>{
      /*this.employees = this.employeeList.valueChanges().pipe(
      map(employees => employees.filter(employee => employee.IsVisible == true))
    );*/
    this.employees = this.employeeList.snapshotChanges().pipe(
      map(changes => 
      
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .filter(employee => employee.IsVisible == true),
      )
    );
    return this.employees;

  }

  deleteEmployee(key){
    this.employeeList.update(key,{IsVisible: false});
  }

  updateEmployee(key:string, employee: Employee)
  {
    this.employeeList.update(key,employee);
    
  }


}
