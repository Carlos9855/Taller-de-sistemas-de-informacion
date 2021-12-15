import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { GridOptions, GridOptionsWrapper } from 'ag-grid-community';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { IconRendererComponent } from '../../icon-renderer/icon-renderer.component';
import { localeEs } from 'src/assets/locale.es.js';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { AddClienteComponent } from '../add-cliente/add-cliente.component';
import { ViewOneClienteComponent } from '../view-one-cliente/view-one-cliente.component';

@Component({
  selector: 'app-view-cliente',
  templateUrl: './view-cliente.component.html',
  styleUrls: ['./view-cliente.component.scss']
})
export class ViewClienteComponent implements OnInit {

  public gridOptions: GridOptions;
  public rowData;
  public columnDefs;
  public clientesList: Cliente [] = [];
  public frameworkComponents: any;
  public quickSearchValue: string = '';

  constructor(
    public clienteService: ClienteService,
    public dialog: MatDialog,
    private router: Router,
    private toastService: HotToastService
  ) { }

  ngOnInit(): void {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };
    this.getClientesData();
    this.loadData();
  }


  loadData()
  {
     this.gridOptions = {
       domLayout: 'autoHeight',
       pagination: true,

       paginationPageSize: 11,
       onGridReady: (params) => {
         // params.columnApi.autoSizeAllColumns(true);
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
           onClick: this.editCliente.bind(this),
           icon: `<svg width="30" height="30" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect class="svg-edit" x="197.551" y="39.2333" width="89.6003" height="206.617" transform="rotate(45 197.551 39.2333)" fill="#C2C2C7"/>
           <path class="svg-edit" d="M295.727 46.704C301.39 52.3666 301.39 61.5475 295.727 67.2101L282.027 80.9103L219.064 17.9478L232.764 4.2476C238.427 -1.415 247.608 -1.415 253.271 4.2476L295.727 46.704Z" fill="#C2C2C7"/>
           <path class="svg-edit" d="M0.391618 299.463L30.0999 207.174L92.6809 269.755L0.391618 299.463Z" fill="#C2C2C7"/>
           </svg>`,
           tooltip: 'Editar',
           color: '#E5CA66'
         },
         width: 70,
         // minWidth: 80,
         pinned: 'right'
       },
       {
         cellRenderer: 'iconRenderer',
         cellRendererParams: {
           onClick: this.deleteConfirmation.bind(this),
           icon: `<svg width="30" height="30" viewBox="0 0 264 300" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect class="svg-delete" y="36" width="264" height="34" rx="17" fill="#C2C2C7"/>
           <path class="svg-delete" fill-rule="evenodd" clip-rule="evenodd" d="M96 0C81.6406 0 70 11.6406 70 26V36H88V24C88 21.2386 90.2386 19 93 19H169C171.761 19 174 21.2386 174 24V36H193V26C193 11.6406 181.359 0 167 0H96Z" fill="#C2C2C7"/>
           <path class="svg-delete" fill-rule="evenodd" clip-rule="evenodd" d="M245 89H17L32.6372 275.5C33.4876 289.269 44.9022 300 58.6971 300H206.465C218.878 300 229.543 291.189 231.885 279L245 89ZM131 105C126.029 105 122 109.029 122 114V256C122 260.971 126.029 265 131 265C135.971 265 140 260.971 140 256V114C140 109.029 135.971 105 131 105ZM173.903 113.988C174.163 109.024 178.398 105.211 183.361 105.471C188.325 105.731 192.138 109.966 191.878 114.93L184.446 256.735C184.186 261.699 179.951 265.512 174.988 265.252C170.024 264.992 166.211 260.757 166.471 255.793L173.903 113.988ZM78.9877 105.471C74.0239 105.731 70.2109 109.966 70.471 114.93L77.9027 256.735C78.1629 261.699 82.3977 265.512 87.3614 265.252C92.3252 264.992 96.1382 260.757 95.8781 255.793L88.4464 113.988C88.1862 109.024 83.9514 105.211 78.9877 105.471Z" fill="#C2C2C7"/>
           </svg>`,
           tooltip: 'Eliminar',
           color: '#E36B6B'
         },
         width: 70,
         // minWidth: 80,
         pinned: 'right'
       },
       {
         cellRenderer: 'iconRenderer',
         cellRendererParams: {
           onClick: this.viewClienteData.bind(this),
           icon: `<svg  width="30" height="30" viewBox="0 0 300 181" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path class="svg-view" fill-rule="evenodd" clip-rule="evenodd" d="M149.5 181C203.348 181 300 144.348 300 90.5C300 36.6522 203.348 0 149.5 0C95.6522 0 0 37.1522 0 91C0 144.848 95.6522 181 149.5 181ZM150 156C185.899 156 215 126.899 215 91C215 55.1015 185.899 26 150 26C114.101 26 85 55.1015 85 91C85 126.899 114.101 156 150 156Z" fill="#C2C2C7"/>
           <circle class="svg-view" cx="150" cy="91" r="47" fill="#C2C2C7"/>
           </svg>`,
           tooltip: 'Ver',
           color: '#3BBACC'
         },
         width: 70,
         // minWidth: 80,
         pinned: 'right'
       },
     ];
  }

  addCliente(){
    this.dialog.open(AddClienteComponent,
      {
        width: '100vw',
        height: '90vh',
      }
      )
    .afterClosed()
    .subscribe((confirm: Boolean) => {
        this.clienteService.selectedCliente = new Cliente();
        if(confirm){
          this.toastService.success('Se guardo exitosamente',{
            style: {
              border: '1px solid #737378',
              padding: '16px',
              color: '#737378',
              fontWeight: '500'
            },
            iconTheme: {
              primary: '#4ECFAE',
              secondary: '#FFFAEE',
            },
          });
        }
        else{
          this.toastService.warning('Operacion cancelada',{
            style: {
              border: '1px solid #737378',
              padding: '16px',
              color: '#737378',
              fontWeight: '500'
            },
            iconTheme: {
              primary: '#E5CA66',
              secondary: '#FFFAEE',
            },
          });
        }
    })
  }

  deleteConfirmation(clienteInstance){
    console.log(clienteInstance.rowData.IsVisible);
    this.dialog
    .open(ConfirmationDialogComponent, {data: "¿Seguro que desea eliminar este empleado?"})
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.deleteCliente(clienteInstance.rowData.key);
      }
      else{
        this.toastService.warning('Operacion cancelada',{
          style: {
            border: '1px solid #737378',
            padding: '16px',
            color: '#737378',
            fontWeight: '500'
          },
          iconTheme: {
            primary: '#E5CA66',
            secondary: '#FFFAEE',
          },
        });
      }
    });
  }

  deleteCliente(key: string){
    this.clienteService.deleteCliente(key);
    this.toastService.success('Se elimino exitosamente',{
      style: {
        border: '1px solid #737378',
        padding: '16px',
        color: '#737378',
        fontWeight: '500'
      },
      iconTheme: {
        primary: '#4ECFAE',
        secondary: '#FFFAEE',
      },
    });
  }

  getClientesData(){
    this.clienteService.getClienteList()
    .subscribe( cliente => {
        this.clientesList = cliente;
    },
    error => {
      var errorMessage = error.message && error.status == 0 ? "Error al contactar al servidor" : error.error.message || "Error al cargar clientes";
    });
  }

  viewClienteData(cliente){
    this.dialog.open(ViewOneClienteComponent,
      {
       data: cliente.rowData,
       width: '100vw',
       height: '90vh',
      })
      .afterClosed()
      .subscribe(() => {
          this.clienteService.selectedCliente = new Cliente();
      })
  }

  editCliente(item){
    this.getNewClienteInstance(item);
    this.addCliente();
  }

  getNewClienteInstance(item){
    this.clienteService.selectedCliente.$key = item.rowData.key;
    this.clienteService.selectedCliente.Ci = item.rowData.Ci;
    this.clienteService.selectedCliente.Name = item.rowData.Name;
    this.clienteService.selectedCliente.LastName = item.rowData.LastName;
    this.clienteService.selectedCliente.BirthdayDate = item.rowData.BirthdayDate;
    this.clienteService.selectedCliente.Phone = item.rowData.Phone;
    this.clienteService.selectedCliente.Email = item.rowData.Email;
    this.clienteService.selectedCliente.Cellphone = item.rowData.Cellphone;
    this.clienteService.selectedCliente.Address = item.rowData.Address;
  }

  onQuickFilterChanged() {
    this.gridOptions.api.setQuickFilter(this.quickSearchValue);
}
}
