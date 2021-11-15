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

  goToProductList(){
    this.router.navigate(['/view-products']);
  }
  goToCategoryMenu(){
    this.router.navigate(['/categories-sidenav']);
  }
  goToEmployeeList(){
    this.router.navigate(['/view-employees']);
  }
  goToCategoriesList(){
    this.router.navigate(['/view-categories']);
  }
}
