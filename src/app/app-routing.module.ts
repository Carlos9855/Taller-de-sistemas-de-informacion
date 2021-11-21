import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/employees/view-employee/view-employee.component';
import { ViewProductsComponent } from './components/productos/view-products/view-products.component';
import { ControlpanelComponent } from './components/controlpanel/controlpanel.component';
import { ViewAddCategoryComponent } from './components/categories/view-add-category/view-add-category.component';
import { ViewGeneralInformationComponent } from './components/view-product/view-general-information/view-general-information/view-general-information.component';
import { MenuCategoriasComponent } from './components/menu-categorias/menu-categorias.component';
import { CategoriesSidebarComponent } from './components/categories/categories-sidebar/categories-sidebar.component';
import { CategoriesMainMenuComponent } from './components/categories/categories-main-menu/categories-main-menu.component';
import { ProductosMainMenuComponent} from './components/productos/productos-main-menu/productos-main-menu.component';
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
  { path: 'view-employees', component: ViewEmployeeComponent },
  { path: 'view-products', component: ViewProductsComponent },
  { path: 'control-panel', component:ControlpanelComponent},
  { path: 'view-categories', component:ViewAddCategoryComponent},
  { path: 'view-details-of-product', component:ViewGeneralInformationComponent},
  { path: 'menu-categorias',component:MenuCategoriasComponent},
  { path: 'categories-menu',component:CategoriesMainMenuComponent},
  { path: 'categories-sidenav',component:CategoriesSidebarComponent},
  { path: 'Product-menu',component:ProductosMainMenuComponent},
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
