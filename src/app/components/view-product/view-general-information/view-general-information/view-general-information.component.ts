import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-view-general-information',
  templateUrl: './view-general-information.component.html',
  styleUrls: ['./view-general-information.component.scss']
})
export class ViewGeneralInformationComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public product: Producto) { }

  ngOnInit(): void {
  }

  goToSpecifications(){
      var divReplaced = document.getElementById("div-replaced");
      var divToReplace = document.getElementById("div-replace");
      // const template = document.getElementById("template");
      // const firstClone = template.cloneNode(true);
      // divReplaced.appendChild(firstClone);
      // toReplace = specificationsElement.outerHTML;
      // specificationsElement.replaceWith("<div><h1>NO HOLA JUPITER</h1></div>");
      divReplaced.innerHTML = divToReplace.innerHTML;
      
  }

}
