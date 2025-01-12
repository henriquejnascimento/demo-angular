import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ProductStatus } from '../models/product-status.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStatusService extends BaseService<ProductStatus> {

  override apiUrl: string = 'http://localhost:8081/product-status';
  override baseUrl: string = "/products-status";
  override listSuffix: string = "Products status";
  override formSuffix: string = "Product status";  
  
  constructor(http: HttpClient) { 
    super(http);    
  }

  getData(): Observable<ProductStatus[]> {
    let url = `${this.apiUrl}`;
    return this.http.get<ProductStatus[]>(url);
  }

}