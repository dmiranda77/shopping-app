import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    return this.http.get<Products[]>(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Products>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  Update(data: Products) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Products) {
    return this.http.post(this.baseurl, data);
  }
}
