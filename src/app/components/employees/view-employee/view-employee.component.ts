import { Component, OnInit } from '@angular/core';
import { Grid, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  employees: Observable<any[]>;
  public gridOptions: GridOptions
  constructor(
    public employeeService: EmployeeService,
    private router: Router
     ) 
     {
     this.employees = this.employeeService.getEmployeesList();

     this.employees = this.employeeService.getKey().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }

  ngOnInit(): void {
  /* this.loadData();
    this.createGrid();*/
  }

  deleteEmployee(key){
    this.employeeService.deleteEmployee(key);
  }

    loadData()
   {
    this.gridOptions = {
      columnDefs: [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]
    };
   }


 createGrid(){
    let eGridDiv = document.querySelector('#myGrid') as HTMLElement;
    new Grid(eGridDiv, this.gridOptions);
  }

  editEmployee(item){

    this.employeeService.selectedEmployee.$key = item.key;
    this.employeeService.selectedEmployee.Ci = item.Ci;
    this.employeeService.selectedEmployee.Name = item.Name;
    this.employeeService.selectedEmployee.LastName = item.LastName;
    this.employeeService.selectedEmployee.BirthdayDate = item.BirthdayDate;
    this.employeeService.selectedEmployee.Phone = item.Phone;
    this.employeeService.selectedEmployee.Email = item.Email;
    this.employeeService.selectedEmployee.Cellphone = item.Cellphone;
    this.employeeService.selectedEmployee.Address = item.Address;
    this.router.navigate(['add-employee']);

  }

}
