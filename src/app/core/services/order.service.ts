import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseurl = 'http://localhost:3000/orders';
  constructor(private http: HttpClient) {
  }

  GetAll() {
    return this.http.get<Order[]>(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Order>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  Update(data: Order) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Order) {
    return this.http.post(this.baseurl, data);
  }
}
