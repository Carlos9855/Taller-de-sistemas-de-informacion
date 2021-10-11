import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  products: Observable<any[]>;
  constructor(public productService: ProductoService) {

    this.products = this.productService.getProductList();

    this.products = this.productService.getKey().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
   }

  ngOnInit(): void {
  }

  deleteProduct(key){
    this.productService.deleteProduct(key);
  }

}
