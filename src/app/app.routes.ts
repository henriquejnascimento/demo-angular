import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/create',
    component: ProductFormComponent
  },
  {
    path: 'products/update/:id', 
    component: ProductFormComponent 
  },
  {
    path: 'test-menu',
    component: MenuComponent
  },
];
