import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
  {
    path: 'home',
    component: MenuComponent
  },
  {
    path: 'crud',
    component: ProductListComponent
  },
  {
    path: '',
    redirectTo: '/crud',
    pathMatch: 'full'
  }
];
