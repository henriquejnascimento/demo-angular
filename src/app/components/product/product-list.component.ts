import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from '../base-component/base-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../services/product.service';
import { PaginatedResponse } from '../models/paginated-response.model';
import { Product } from '../models/product.model';
import { MatTableDataSource } from '@angular/material/table';

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
  override isLoading: boolean = true; // TODO MOVE

  constructor(private productService: ProductService, changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadData(this.currentPageIndex, this.pageSize)
  }

  override loadData(
    currentPageIndex: number, 
    pageSize: number, 
    filters: { [key: string]: string } = {}) {

    this.productService.getData(currentPageIndex, pageSize, filters).subscribe({
      next: (response: PaginatedResponse<Product>) => {
        this.setup(this.title, this.columns, response.content);
        this.data = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pageSize = pageSize;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

}
