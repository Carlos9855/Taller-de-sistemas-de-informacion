import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-view-one-cliente',
  templateUrl: './view-one-cliente.component.html',
  styleUrls: ['./view-one-cliente.component.scss']
})
export class ViewOneClienteComponent implements OnInit {

  public age: number;
  public initial: string;

  constructor(
    public dialog: MatDialogRef<ViewOneClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) { }

  ngOnInit(): void {
    this.getAge();
    this.getNameFirsTLetter();
  }

  getAge(){
    const today = new Date();
    const birthDate = new Date(this.cliente.BirthdayDate);
    this.age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        this.age--;
    }
    console.log(this.age);
  }

  getNameFirsTLetter(){
    this.initial =  this.cliente.Name.charAt(0)
}


}
