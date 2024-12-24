import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BaseListComponent } from '../base-component/base-list.component';

@Component({
  selector: 'app-crud',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    FormsModule,
    MatSortModule,
  ]
})
export class ProductComponent extends BaseListComponent implements OnInit, AfterViewInit {
  ngOnInit() {
    let title = "Product";
    let columns = [
      { label: 'id', visibility: true },
      { label: 'name', visibility: true },
      { label: 'age', visibility: true }
    ];
    let data = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 },
      { id: 3, name: 'Doe', age: 35 },
      { id: 4, name: 'Alice', age: 28 },
      { id: 5, name: 'Bob', age: 40 },
      { id: 6, name: 'Charlie', age: 22 },
      { id: 7, name: 'David', age: 50 },
      { id: 8, name: 'Eve', age: 29 },
      { id: 9, name: 'Frank', age: 38 },
      { id: 10, name: 'Grace', age: 27 },
      { id: 11, name: 'Hannah', age: 32 },
      { id: 12, name: 'Ivan', age: 45 },
      { id: 13, name: 'Jack', age: 55 },
      { id: 14, name: 'Karen', age: 60 },
      { id: 15, name: 'Leo', age: 33 },
    ];

    this.setup(title, columns, data);

    this.calculateTotalPages();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






  logVisibleIds() {
    if (!this.paginator || !this.sort) return;

    const sortedData = this.dataSource.sortData(this.dataSource.filteredData, this.sort);

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;

    const currentPageData = sortedData.slice(startIndex, endIndex);
    const visibleIds = currentPageData.map(item => item.id);

    visibleIds.forEach(element => {
      this.selectedIds.add(element);
    });
    
    console.log("IDs visíveis na tabela:", visibleIds);
  }
}
