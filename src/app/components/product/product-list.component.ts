import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from '../base-component/base-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../services/product.service';
import { PaginatedResponse } from '../models/paginated-response.model';
import { Product } from '../models/product.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-crud',
  templateUrl: '../base-component/base-list.component.html',
  styleUrls: ['../base-component/base-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
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
  
  constructor(private productService: ProductService, changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
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
