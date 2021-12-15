import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-producto-main-detail',
  templateUrl: './producto-main-detail.component.html',
  styleUrls: ['./producto-main-detail.component.scss']
})
export class ProductoMainDetailComponent implements OnInit {

  constructor( public dialog: MatDialogRef<ProductoMainDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Producto,
      public cartService: CartService) { }

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

    addToCart(product: Producto){
        this.cartService.addProductToCart(product);
        this.dialog.close(true);
    }
}
