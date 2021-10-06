import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { Employee } from 'src/app/models/employee';



@NgModule({
  declarations: [AddEmployeeComponent, ViewEmployeeComponent],
  imports: [
    Employee,
    CommonModule
  ]
})
export class EmployeesModule { }
