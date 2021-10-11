import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/employees/view-employee/view-employee.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'view-employee', component: ViewEmployeeComponent },
  { path: 'productos' , component:ListaProductosComponent},
  { path: 'crear-producto' , component:ProductoComponent},
  { path: 'editar-producto' , component:ProductoComponent},
  { path: 'producto-menu-completo' , component:ProductosComponent},
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
