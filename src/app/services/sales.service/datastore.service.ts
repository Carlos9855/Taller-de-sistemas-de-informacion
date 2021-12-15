import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  readonly ROOT_URL = `http://localhost:8080/api/sales/`
  constructor(private http: HttpClient) { }

  public createSaleOnCash(sale: Sale){
    
    console.log(sale);
     this.http.post<Sale>(`${this.ROOT_URL}onCash`, sale).toPromise().then(() =>{
     }).catch(error => console.log(error))
     
  }

  public createSaleOnCredit(sale: Sale){
    this.http.post<Sale>(`${this.ROOT_URL}/onCredit`, sale)
 }

  public getSales(): Observable<Sale[]>{
    return this.http.get<Sale[]>(`${this.ROOT_URL}`)
  }
}
