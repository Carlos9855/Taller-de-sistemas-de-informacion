import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-producto-main-detail',
  templateUrl: './producto-main-detail.component.html',
  styleUrls: ['./producto-main-detail.component.scss']
})
export class ProductoMainDetailComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public product: Producto) { }

  ngOnInit(): void {
  }

  goToSpecifications(){
    console.log("ahora soy pior");
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
