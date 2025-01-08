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
    pathUrl!: string;
    name!: string;
    CONTENT_TYPE_HEADER = 'Content-Type';
    CONTENT_TYPE_JSON = 'application/json';

    constructor(protected http: HttpClient) {}

    delete(ids: any[]): Observable<void> {
        console.log("BaseService > delete()");
        return this.http.delete<void>(this.apiUrl + "/deleteByIdList", {
          //headers: { CONTENT_TYPE_HEADER: this.CONTENT_TYPE_JSON },
          headers: { 'Content-Type': 'application/json' },  // Cabeçalho correto
          body: ids
        });        
    }

    create(product :Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product)
    }
}