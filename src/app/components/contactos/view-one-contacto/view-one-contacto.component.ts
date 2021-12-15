import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-view-one-contacto',
  templateUrl: './view-one-contacto.component.html',
  styleUrls: ['./view-one-contacto.component.scss']
})
export class ViewOneContactoComponent implements OnInit {

  public initial: string;

  constructor(
    public dialog: MatDialogRef<ViewOneContactoComponent>,
    @Inject(MAT_DIALOG_DATA) public contacto: Contacto)
  { }

  ngOnInit(): void {
    this.getNameFirsTLetter();
  }

  getNameFirsTLetter(){
    this.initial =  this.contacto.Name.charAt(0)
}
}
