import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '..//models/paginated-response.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

    apiUrl!: string;
    baseUrl!: string;
    listSuffix!: string;
    formSuffix! :string;
    CONTENT_TYPE_HEADER = 'Content-Type';
    CONTENT_TYPE_JSON = 'application/json';

    constructor(protected http: HttpClient) {}

    delete(ids: any[]): Observable<void> {
        return this.http.delete<void>(this.apiUrl + "/deleteByIdList", {
          //headers: { CONTENT_TYPE_HEADER: this.CONTENT_TYPE_JSON },
          headers: { 'Content-Type': 'application/json' },  // Cabeçalho correto
          body: ids
        });        
    }

    create(product :Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product)
    }

    findById(id: any):Observable<void> {
      return this.http.get<void>(`${this.apiUrl}/${id}`);
    }

    updateById(id: any, updatedItem: T): Observable<T> {
      return this.http.put<T>(`${this.apiUrl}/${id}`, updatedItem, {
        headers: { 'Content-Type': 'application/json' }
      });
  }    
}