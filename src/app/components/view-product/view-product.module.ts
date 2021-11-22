import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewGeneralInformationComponent } from './view-general-information/view-general-information/view-general-information.component';
import { ProductoMainDetailComponent } from './producto-main-detail/producto-main-detail.component';



@NgModule({
  declarations: [
    ViewGeneralInformationComponent,
    ProductoMainDetailComponent,],
  imports: [
    CommonModule,
  ],
})
export class ViewProductModule { }
