import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { Employee } from 'src/app/models/employee';
import { AgGridModule } from 'ag-grid-angular';
import { ViewOneEmployeeComponent } from './view-one-employee/view-one-employee.component';


@NgModule({
  declarations: [AddEmployeeComponent, ViewEmployeeComponent, ViewOneEmployeeComponent],
  imports: [
    Employee,
    CommonModule,
    AgGridModule.withComponents([])
  ]
})
export class EmployeesModule { }