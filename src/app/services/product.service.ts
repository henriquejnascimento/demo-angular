import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../components/models/paginated-response.model';
import { Product } from '../components/models/product.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  override baseUrl: string = 'http://localhost:8081/products';

  constructor(http: HttpClient) { 
    super(http);    
  }

  getData(
    page: number = 0,
    size: number = 10,
    filters: { [key: string]: string } = {}): Observable<PaginatedResponse<Product>> {
    let url = `${this.baseUrl}?page=${page}&size=${size}`;
    return this.http.get<PaginatedResponse<Product>>(
      this.buildUrl(url, filters)
    );
  }

  buildUrl(
    url: string,
    filters: { [key: string]: string }): string {
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        url += `&${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`;
      }
    }
    return url;
  }

}