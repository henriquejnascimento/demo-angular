import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from '../base-list/base-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../services/product.service';
import { PaginatedResponse } from '../../models/paginated-response.model';
import { Product } from '../../models/product.model';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crud',
  templateUrl: '../base-list/base-list.component.html',
  styleUrls: ['../base-list/base-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
  ]
})
export class ProductListComponent extends BaseListComponent implements OnInit {
  override title: string = "Products"; // TODO check override
  override columns = [
    { label: 'id', visibility: true },
    { label: 'name', visibility: true },
    // { label: 'description', visibility: true },
    // { label: 'status', visibility: true },
  ];
  data: any[] = [];
  
  constructor(
    private productService: ProductService, 
    router: Router,
    changeDetectorRef: ChangeDetectorRef,
    dialog: MatDialog
  ) {
    super(productService, router, changeDetectorRef, dialog);
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadData(this.currentPageIndex, this.pageSize);
    this.isLoading = false;
    // this.changeDetectorRef.detectChanges();
  }

  override loadData(
    currentPageIndex: number, 
    pageSize: number, 
    filters: { [key: string]: string } = {}) {

    this.productService.getData(currentPageIndex, pageSize, filters).subscribe({
      next: (response: PaginatedResponse<Product>) => {
        //this.data = response.content;
        this.setup(this.title, this.columns, response);
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
      }
    });
  }
  
}
