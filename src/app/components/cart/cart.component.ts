import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: Producto[]
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart
  }


  registerSales(){
    this.cartService.sellAllItemsInTheCart()
  }

}
