import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  baseurl = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) {
  }

  GetAll() {
    return this.http.get<Cart[]>(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Cart>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  Update(data: Cart) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Cart) {
    return this.http.post(this.baseurl, data);
  }
  GetMaxCode(): Observable<number> {
    return this.GetAll().pipe(
      map((carts: Cart[]) => {
        if (carts && carts.length > 0) {
          return Math.max(...carts.map(cart => cart.id));
        } else {
          return 0;
        }
      })
    );
  }
  
}
