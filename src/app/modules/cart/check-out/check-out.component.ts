import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../shared/models/cart';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { updatecart, updatestatuses } from '../../../core/store/Cart/Cart.Action';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckoutComponent implements OnInit {
  dataSource: Cart[] = [];
  ordersTotalPrice: number = 0;
  displayedColumns: string[] = ['id', 'productname', 'quantity',  'status','totalPrice',];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private cartService: CartService)

    { }

  ngOnInit(): void {
    const storedCartList = localStorage.getItem('cartList');
    if (storedCartList) {
      this.dataSource = JSON.parse(storedCartList);
      this.ordersTotalPrice = this.calculateTotalPrice(this.dataSource);
      console.log('Order Total Price:', this.ordersTotalPrice);
    }
  }
  confirmCheckout(): void {
    this.dataSource.forEach(cart => {
      cart.status = 'pending';
    });
    this.store.dispatch(updatestatuses({ cartList: this.dataSource }));
    console.log('Updated',this.dataSource);
    this.cartService.UpdateStatusesToPending(this.dataSource)
    .subscribe(() => {
      console.log('Statuses updated to pending');
    }, error => {
      console.error('Error updating statuses:', error);
    });
  }

  navigateBackToCart(): void {
    this.router.navigate(['/cart']);
  }

  calculateTotalPrice(dataSource: Cart[]): number {
    return dataSource.reduce((total, cart) => total + cart.totalPrice, 0);
  }
}
