import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { localeEs } from 'src/assets/locale.es.js';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';




@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  employees: Observable<any[]>;
  public gridOptions: GridOptions;
  public rowData;
  public columnDefs;
  public employeesList: Employee [] = [];
  quickSearchValue: string = '';

  constructor(
    public employeeService: EmployeeService,
    public dialog: MatDialog)
     {
        this.employees = this.employeeService.getEmployeesList();
        this.employees = this.employeeService.getKey().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        )
    }

  ngOnInit(): void {
    this.getEmployeesData();
    this.loadData();
  }

  deleteConfirmation(key: string){
    this.dialog
    .open(ConfirmationDialogComponent, {data: "¿Seguro que desea eliminar este empleado?"})
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.deleteEmployee(key);
      }
    });
  }

  deleteEmployee(key: string){
    this.employeeService.deleteEmployee(key);
  }


  getEmployeesData(){
    this.employeeService.getEmployeesList().subscribe( employee => {
      this.employeesList = employee;
    },
    error => {
      var errorMessage = error.message && error.status == 0 ? "Error al contactar al servidor" : error.error.message || "Error al cargar empleados";
    });

  }

   loadData()
   {
      this.gridOptions = {
        domLayout: 'autoHeight',
        pagination: true,
        paginationPageSize: 20,
        onGridReady: (params) => {
          params.api.sizeColumnsToFit();
          params.api.collapseAll();
        },
        onGridSizeChanged: (params) => {
          params.api.collapseAll();
        },
        defaultColDef: {
          resizable: true
        },
        localeTextFunc: (key: string, defaultValue: string) => localeEs[key] || defaultValue
      }

      this.columnDefs = [
        { headerName: 'Ci', field: 'Ci', filter:true, sortable:true },
        { headerName: 'Nombre', field: 'Name', filter:true, sortable:true },
        { headerName: 'Apellido', field: 'LastName', filter:true, sortable:true },
        { headerName: 'Celular', field: 'Cellphone', filter:true },
        { headerName: 'Email', field: 'Email', filter:true},
        { headerName: 'Direccion', field: 'Address', filter:true },
      ];
      
   }


  onQuickFilterChanged() {
      this.gridOptions.api.setQuickFilter(this.quickSearchValue);
  }


}
