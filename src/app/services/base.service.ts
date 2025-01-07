import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '..//models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

    protected baseUrl!: string;
    CONTENT_TYPE_HEADER = 'Content-Type';
    CONTENT_TYPE_JSON = 'application/json';

    constructor(protected http: HttpClient) {}

    delete(ids: any[]): Observable<void> {
        console.log("BaseService > delete()");
        return this.http.delete<void>(this.baseUrl + "/deleteByIdList", {
          //headers: { CONTENT_TYPE_HEADER: this.CONTENT_TYPE_JSON },
          headers: { 'Content-Type': 'application/json' },  // Cabeçalho correto
          body: ids
        });        
    }
}