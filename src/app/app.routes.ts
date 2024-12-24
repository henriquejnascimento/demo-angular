import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list.component';

export const routes: Routes = [
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
