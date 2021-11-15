import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

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

// SERVICIOS
import { ProductoService } from './services/producto.service';


// CONFIRMATION DIALOG
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { IconRendererComponent } from './components/icon-renderer/icon-renderer.component';

//SIDEBAR/CARD_MENU COMPONENTS
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatListModule} from '@angular/material/list';


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
    CategoriesMainMenuComponent,
    CategoriesSidebarComponent
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
    MatListModule
  ],
  providers: [
    ProductoService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
