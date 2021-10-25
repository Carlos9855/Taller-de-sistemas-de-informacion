import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Grid, GridOptions} from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit{
  products: Observable<any[]>;
  productsEliminates: Producto;
  constructor(
    public productService: ProductoService,
    public dialog: MatDialog, 
    private router: Router
    ) 
  {
    this.products = this.productService.getProductList();
    this.products = this.productService.getKey().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }

  ngOnInit():void {

  }

  deleteConfirmation(key: string){
    this.dialog
    .open(ConfirmationDialogComponent, {data: "¿Seguro que desea eliminar este producto?"})
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.deleteProduct(key);
      }
    });
  }

  deleteProduct(key){
      this.productService.deleteProduct(key);
  }

  editProduct(item){
    this.productService.selectedProduct.$key = item.key;
    this.productService.selectedProduct.Description = item.Description;
    this.productService.selectedProduct.Model = item.Model;
    this.productService.selectedProduct.Name = item.Name;
    this.productService.selectedProduct.Price = item.Price;
    this.productService.selectedProduct.Category = item.Category;
    this.productService.selectedProduct.Amount = item.Amount;
    this.productService.selectedProduct.Code = item.Code;
    this.router.navigate(['create-products']);
  }

}