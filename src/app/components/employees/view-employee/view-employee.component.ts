import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';




@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  employees: Observable<any[]>;
  constructor(public employeeService: EmployeeService) {
     this.employees = this.employeeService.getEmployeesList();

     this.employees = this.employeeService.getKey().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }

  ngOnInit(): void {

  }

  deleteEmployee(key){
    this.employeeService.deleteEmployee(key);
  }


}
