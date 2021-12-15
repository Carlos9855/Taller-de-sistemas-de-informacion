import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-add-contacto',
  templateUrl: './add-contacto.component.html',
  styleUrls: ['./add-contacto.component.scss']
})
export class AddContactoComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<AddContactoComponent>,
    public contactoService: ContactoService,
    private router: Router,)
  { }

  ngOnInit(): void {
  }

  onSubmit(contacForm: NgForm)
  {
    if(this.contactoService.selectedContacto.$key != null){
        this.contactoService.updateContacto(this.contactoService.selectedContacto.$key,contacForm.value);
    }
    else{
        this.contactoService.insertProduct(contacForm.value);
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
