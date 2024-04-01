import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../shared/models/cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckoutComponent implements OnInit {
  dataSource: Cart[] = [];
  displayedColumns: string[] = ['productname', 'quantity', 'unitPrice', 'totalPrice'];
  ordersTotalPrice: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.ordersTotalPrice = this.calculateTotalPrice();
    } else {
    }
  }

  navigateBackToCart(): void {
    this.router.navigate(['/cart']);
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.dataSource) {
      totalPrice += item.totalPrice;
    }
    return totalPrice;
  }
}
