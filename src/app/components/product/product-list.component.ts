import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from '../base-component/base-list.component';
import { SharedModule } from '../../shared/shared.module';

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
  }

}
