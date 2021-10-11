import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { FormsModule } from '@angular/forms';

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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

// COMPONENTES-PRODUCTOS
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/employees/view-employee/view-employee.component';


// SERVICIOS
import { ProductoService } from './services/producto.service';



const routes: Routes = [
  { path: 'create_products', component: ProductoComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductosComponent,
    ProductoComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    ListaProductosComponent
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
    BrowserAnimationsModule
  ],
  providers: [
    ProductoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
