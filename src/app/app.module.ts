import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


// RUTAS
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

// COMPONENTES-PRODUCTOS
import { ProductoComponent } from './components/productos/producto/producto.component'
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component'
import { ViewEmployeeComponent } from './components/employees/view-employee/view-employee.component';
import { ViewProductsComponent } from './components/productos/view-products/view-products.component';
import { ControlpanelComponent } from './components/controlpanel/controlpanel.component';
import { ViewAddCategoryComponent } from './components/categories/view-add-category/view-add-category.component';
import { CategoriesSidebarComponent } from './components/categories/categories-sidebar/categories-sidebar.component';
import { CategoriesMainMenuComponent } from './components/categories/categories-main-menu/categories-main-menu.component';
import { MenuCategoriasComponent } from './components/menu-categorias/menu-categorias.component';

import { ProductosMainMenuComponent } from './components/productos/productos-main-menu/productos-main-menu.component';

import { ViewOneEmployeeComponent } from './components/employees/view-one-employee/view-one-employee.component';

// SERVICIOS
import { ProductoService } from './services/producto.service';


// CONFIRMATION DIALOG
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { IconRendererComponent } from './components/icon-renderer/icon-renderer.component';
import { ViewGeneralInformationComponent } from './components/view-product/view-general-information/view-general-information/view-general-information.component';

//SIDEBAR/CARD_MENU COMPONENTS
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatListModule} from '@angular/material/list';
import { ProductoMainDetailComponent } from './components/view-product/producto-main-detail/producto-main-detail.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ViewContactoComponent } from './components/contactos/view-contacto/view-contacto.component';
import { AddContactoComponent } from './components/contactos/add-contacto/add-contacto.component';
import { ViewOneContactoComponent } from './components/contactos/view-one-contacto/view-one-contacto.component';
import { AddClienteComponent } from './components/cliente/add-cliente/add-cliente.component';
import { ViewClienteComponent } from './components/cliente/view-cliente/view-cliente.component';
import { ViewOneClienteComponent } from './components/cliente/view-one-cliente/view-one-cliente.component';



const routes: Routes = [
  { path: 'create-products', component: ProductoComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductoComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    ViewProductsComponent,
    ControlpanelComponent,
    ConfirmationDialogComponent,
    IconRendererComponent,
    ViewAddCategoryComponent,
    MenuCategoriasComponent,
    ProductosMainMenuComponent,
    CategoriesMainMenuComponent,
    CategoriesSidebarComponent,
    //ViewGeneralInformationComponent,
    //ProductoMainDetailComponent,
    ViewGeneralInformationComponent,
    ViewContactoComponent,
    AddContactoComponent,
    ViewOneContactoComponent,
    AddClienteComponent,
    ViewClienteComponent,
    ViewOneClienteComponent,
    ViewOneEmployeeComponent,
    DashboardComponent,
    CartComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AgGridModule.withComponents([]),
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    HotToastModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ProductoService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
