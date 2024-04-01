import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cart } from '../../../shared/models/cart';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deletefromcart, getcart, loadcart, opencartpopup, updatecart } from '../../../core/store/Cart/Cart.Action';
import { MatTableDataSource } from '@angular/material/table';
import { getcartlist } from '../../../core/store/Cart/Cart.Selector';
import { AddOrderComponent } from '../../product/pages/add-order/add-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  CartList!: Cart[];
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ordersTotalPrice: number = 0;

  displayedColumns: string[] = [ 
    "id",
    "orderId",
    "productname",
    "quantity",
    "unitPrice",
    "totalPrice",
    "action"
  ];

  constructor(private dialog: MatDialog, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadcart());
    this.store.select(getcartlist).subscribe(item => {
      this.CartList = item.filter(cart => cart.username === 'diana' && cart.status === 'forPayment');
      this.ordersTotalPrice = this.calculateTotalPrice(this.CartList);
      this.datasource = new MatTableDataSource<Cart>(this.CartList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  calculateTotalPrice(cartList: Cart[]): number {
    return cartList.reduce((total, cart) => total + cart.totalPrice, 0);
  }

  CheckOutPage() {
    localStorage.setItem('cartList', JSON.stringify(this.CartList));
    this.router.navigate(['/checkout'], { state: { dataSource: this.CartList } });
    console.log(this.CartList);
  }
  

  SeeProductsList() {
    this.router.navigate(['/products']);
  }

  FunctionAdd() {}

  FunctionEdit(
    id: number,
    orderId: number,
    productname: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number
  ){
    this.OpenPopup(id, 'Update Order', orderId, productname, quantity, unitPrice, totalPrice);
    this.store.dispatch(getcart({id:id}));
  }

  FunctionDelete(code:number){
    if(confirm('do you want to remove this from cart?')){
      this.store.dispatch(deletefromcart({code:code})); 
    }
  }

  OpenPopup(
    id: number,
    title: string,
    orderId: number,
    productname: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number
  ) {
    this.store.dispatch(opencartpopup());
    this.dialog.open(AddOrderComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
        orderId: orderId,
        productname: productname,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice
      }
    });
  }
}
