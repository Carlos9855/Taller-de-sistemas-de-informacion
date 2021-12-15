import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss']
})
export class AddClienteComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<AddClienteComponent>,
    public clienteService: ClienteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(clienteForm: NgForm){
    if(this.clienteService.selectedCliente.$key != null){
      this.clienteService.updateCliente(this.clienteService.selectedCliente.$key, clienteForm.value);
    }
    else{
      this.clienteService.insertProduct(clienteForm.value);
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
