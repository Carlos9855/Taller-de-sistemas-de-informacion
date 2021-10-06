import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  saveEmployee(employeeForm: NgForm)
  {
    this.employeeService.insertProduct(employeeForm.value);
    this.resetForm(employeeForm);
  }

  resetForm(employeeForm: NgForm)
  {
    if(employeeForm != null)
      employeeForm.reset();
      this.employeeService.selectedEmployee = new Employee();
  }

}
