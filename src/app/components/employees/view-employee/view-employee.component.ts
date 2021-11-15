import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map, filter} from 'rxjs/operators';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { localeEs } from 'src/assets/locale.es.js';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';



@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit{

  public gridOptions: GridOptions;
  public rowData;
  public columnDefs;
  public employeesList: Employee [] = [];
  public frameworkComponents: any;
  public quickSearchValue: string = '';

  constructor(
    public employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router)
     {}

  ngOnInit(): void {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };

    this.getEmployeesData();
    this.loadData();
  }


  deleteConfirmation(employeeInstance){
    console.log(employeeInstance.rowData.IsVisible);
    this.dialog
    .open(ConfirmationDialogComponent, {data: "¿Seguro que desea eliminar este empleado?"})
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.deleteEmployee(employeeInstance.rowData.key);
      }
    });
  }

  deleteEmployee(key: string){
    this.employeeService.deleteEmployee(key);
  }


  getEmployeesData(){
    this.employeeService.getEmployeesList()
    .subscribe( employee => {
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
        
        paginationPageSize: 8,
        onGridReady: (params) => {
          params.columnApi.autoSizeAllColumns(false);
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
        { headerName: 'Ci', field: 'Ci', filter:true, sortable:true, width: 100, minWidth: 100},
        { headerName: 'Nombre', field: 'Name', filter:true, sortable:true },
        { headerName: 'Apellido', field: 'LastName', filter:true, sortable:true },
        { headerName: 'Celular', field: 'Cellphone', filter:true },
        { headerName: 'Correo electronico', field: 'Email', filter:true},
        { headerName: 'Telefono', field: 'Phone', filter:true},
        { headerName: 'Fecha de nacimiento', field: 'BirthdayDate', filter:true},
        { headerName: 'Direccion', field: 'Address', filter:true},
        
        {
          cellRenderer: 'iconRenderer',
          cellRendererParams: {
            onClick: this.editEmployee.bind(this),
            icon: 'editar.png',
            tooltip: 'Editar',
            color: '#D7BD61'
          },
          width: 80,
          minWidth: 80,
          pinned: 'right'
        },
        {
          cellRenderer: 'iconRenderer',
          cellRendererParams: {
            onClick: this.deleteConfirmation.bind(this),
            icon: 'eliminar.png',
            tooltip: 'Eliminar',
            color: '#CA8181'
          },
          width: 80,
          minWidth: 80,
          pinned: 'right'
        },
        {
          cellRenderer: 'iconRenderer',
          cellRendererParams: {
            onClick: this.getSingleEmployeeInformation.bind(this),
            icon: 'view.png',
            tooltip: 'Ver',
            color: '#74c0bc'
          },
          width: 80,
          minWidth: 80,
          pinned: 'right'
        },
      ];
   }


  onQuickFilterChanged() {
      this.gridOptions.api.setQuickFilter(this.quickSearchValue);
  }


  getNewEmployeeInstance(item){
    this.employeeService.selectedEmployee.$key = item.rowData.key;
    this.employeeService.selectedEmployee.Ci = item.rowData.Ci;
    this.employeeService.selectedEmployee.Name = item.rowData.Name;
    this.employeeService.selectedEmployee.LastName = item.rowData.LastName;
    this.employeeService.selectedEmployee.BirthdayDate = item.rowData.BirthdayDate;
    this.employeeService.selectedEmployee.Phone = item.rowData.Phone;
    this.employeeService.selectedEmployee.Email = item.rowData.Email;
    this.employeeService.selectedEmployee.Cellphone = item.rowData.Cellphone;
    this.employeeService.selectedEmployee.Address = item.rowData.Address;
  }

  getSingleEmployeeInformation(employee){
    this.getNewEmployeeInstance(employee);
  }


  editEmployee(item){
    this.getNewEmployeeInstance(item);
    this.router.navigate(['add-employee']);
  }

  

}
