import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  {
    path: 'test-menu',
    component: MenuComponent
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
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];
