import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {



  constructor(
    public dialog: MatDialogRef<AddEmployeeComponent>,
    public employeeService: EmployeeService, 
    private router: Router
    )
    {}

  ngOnInit(): void {
  }



  onSubmit(employeeForm: NgForm)
  {
    if(this.employeeService.selectedEmployee.$key != null){
        this.employeeService.updateEmployee(this.employeeService.selectedEmployee.$key,employeeForm.value); 
    } 
    else{
        this.employeeService.insertProduct(employeeForm.value);
    }
    this.closeDialogTrue();
  }




  closeDialogTrue(){
    this.dialog.close(true);
  }


  closeDialogFalse(){
    this.dialog.close(false);
  }
}
