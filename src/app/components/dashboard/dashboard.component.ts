import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sales.service/sale.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private saleService: SaleService) { }

  salesList: Observable<Sale[]>;
  amountOfSales: number = 0;
  earnedMoney: number = 0;
  mostPopularProduct: Sale;
  mostSuccessfullEmployees: string[5]

  ngOnInit(): void {
    this.salesList = this.saleService.getSales();

    this.salesList.subscribe(sales => {
      sales.forEach(sale =>{
        this.amountOfSales++;
        this.earnedMoney = Number(sale.PriceCanceled) + this.earnedMoney;
      })
    })

    let sales: Sale[] = [];
    this.salesList.subscribe(s => {
      
    })
  }

}
