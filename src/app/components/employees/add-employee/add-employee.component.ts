import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService ,private router: Router) {}

  ngOnInit(): void {
  }

  
  onSubmit(employeeForm: NgForm)
  {
    if(this.employeeService.selectedEmployee.$key != null){
      //  productForm.value.$key = this.productoService.selectedProduct.$key;
        this.employeeService.updateEmployee(this.employeeService.selectedEmployee.$key,employeeForm.value); 
    } 
    else{
        this.employeeService.insertProduct(employeeForm.value);
    }
    this.resetForm(employeeForm);
  }


  goToViewEmployees(){
    this.resetForm();
    this.router.navigate(['/view-employees']);
  }
  resetForm(employeeForm?: NgForm)
  {
    if(employeeForm != null)
      employeeForm.reset();
      this.employeeService.selectedEmployee = new Employee();
  }

  


}
