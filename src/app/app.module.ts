import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, createEffect } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { ProductListComponent } from './modules/product/product-list/product-list.component';
import { CartListComponent } from './modules/cart/cart-list/cart-list.component';
import { ProductItemComponent } from './modules/product/component/product-item/product-item.component';
import { AddOrderComponent } from './modules/product/pages/add-order/add-order.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './modules/product/pages/product-list/product-list.component';
import { MaterialModule } from './material.module';
import { ProductReducer } from './core/store/Product/Product.Reducer';
import { ProductEffects } from './core/store/Product/Product.Effects';
import { AppEffects } from './core/store/Common/App.Effects';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CartReducer } from './core/store/Cart/Cart.Reducer';
import { CartEffects } from './core/store/Cart/Cart.Effect';
import { CheckoutComponent} from './modules/cart/check-out/check-out.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartListComponent,
    ProductItemComponent,
    AddOrderComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({product: ProductReducer, cart: CartReducer}, {}),
    EffectsModule.forRoot([ProductEffects, AppEffects, CartEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxMaskDirective,NgxMaskPipe,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
