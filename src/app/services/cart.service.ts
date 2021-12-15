import { Injectable } from '@angular/core';
import { right } from '@popperjs/core';
import { Producto } from '../models/producto';
import { Sale } from '../models/sale.model';
import { SaleService } from './sales.service/sale.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  public cart: Producto[] = []
  constructor(private saleService: SaleService) { }

  addProductToCart(product: Producto){
    const productAux: Producto = {...product};
    // if(this.cart.includes(product))
    // {
    //   this.cart.forEach(p => {
    //     if(p.Name === product.Name){
    //       p.Amount =++;
    //     }})
    // }
    // else{
    //   productAux.Amount = 1;
    //   this.cart.push(productAux)
    // }
     

    const aux = this.cart.find(p => p.Name === productAux.Name)

    if(aux != undefined){
      aux.Amount = aux.Amount + 1;
    }
    else{
      productAux.Amount = 1;
      this.cart.push(productAux)
    }

  }

  removeProductFromCart(product: Producto){
      this.cart.filter(p => p.Name === product.Name).shift
  }


  sellAllItemsInTheCart(){
    this.cart.forEach(p => {
      const sale = new Sale();
      sale.ClientName = 'Jacobo';
      sale.VendorName = 'Carlos';
      sale.PriceCanceled = p.Amount * p.Price;
      sale.Amount = p.Amount;
      sale.VendorProductName = p.Name;
      sale.ProductPrice = p.Price;
      this.saleService.createSaleOnCash(sale)})
  }
}
