import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-view-one-employee',
  templateUrl: './view-one-employee.component.html',
  styleUrls: ['./view-one-employee.component.scss']
})
export class ViewOneEmployeeComponent implements OnInit {

  public age: number;
  public initial: string;
  constructor(
    public dialog: MatDialogRef<ViewOneEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee) { }

  ngOnInit(): void {
    this.getAge();
    this.getNameFirsTLetter();
  }

  getAge(){
    const today = new Date();
    const birthDate = new Date(this.employee.BirthdayDate);
    this.age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        this.age--;
    }
    console.log(this.age);
  }

  getNameFirsTLetter(){
      this.initial =  this.employee.Name.charAt(0)
  }


}
