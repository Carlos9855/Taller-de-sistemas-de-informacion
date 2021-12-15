import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';
import { DatastoreService } from './datastore.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private saleDataStoreService: DatastoreService) { }

  public createSaleOnCredit(sale: Sale){
      this.saleDataStoreService.createSaleOnCredit(sale);
  }

  public createSaleOnCash(sale: Sale){
      this.saleDataStoreService.createSaleOnCash(sale);
  }

  public getSales(): Observable<Sale[]>{
      return this.saleDataStoreService.getSales();
  }
}
