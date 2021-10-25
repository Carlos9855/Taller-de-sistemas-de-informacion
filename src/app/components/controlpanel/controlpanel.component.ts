import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /*goToControlPanel(){
    this.router.navigate(['/control-panel']);
  }*/
  goToProductList(){
    this.router.navigate(['/view-products']);
  }
  goToInventory(){
    this.router.navigate(['/control-panel']);
  }
  goToEmployeeList(){
    this.router.navigate(['/view-employees']);
  }

}
