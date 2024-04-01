import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './modules/product/pages/product-list/product-list.component';
import { CartListComponent } from './modules/cart/cart-list/cart-list.component';
import { CheckoutComponent } from './modules/cart/check-out/check-out.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'cart', component: CartListComponent},
  { path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
