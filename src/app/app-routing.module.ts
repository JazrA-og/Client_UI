import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';
import { BusinessComponent } from './components/business/business.component';
import { CartComponent } from './components/cart/cart.component';
import { ClientHistoryComponent } from './components/client-history/client-history.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { HistoryDetailsComponent } from './components/history-details/history-details.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  // {path:"" , component: MenuComponent},
  {path:"" , component: ShopComponent},
  // {path:"menu" , component: MenuComponent},
  {path:"login" , component: LoginComponent},
  {path:"register" , component: RegisterComponent},
  {path:"product" , component: ProductComponent},
  // {path:"product-item" , component: ProductItemComponent},
  {path:"product-item?:id" , component: ProductItemComponent},
  {path:"product/:id" , component: ProductComponent},
  {path:"shop" , component: ShopComponent},
  {path:"map" , component: MapComponent},
  {path:"cart" , component: CartComponent},
  {path:"client-history" , component: ClientHistoryComponent},
  {path:"invoice" , component: InvoiceComponent},
  {path:"booking" , component: BookingComponent},
  {path:"business" , component: BusinessComponent},
  {path:"client-info/:id" , component: ClientInfoComponent},
  {path:"client-info" , component: ClientInfoComponent},
  {path:"business-details" , component: BusinessDetailsComponent},
  {path:"history-details" , component: HistoryDetailsComponent},
  {path:"invoice/:id" , component: InvoiceComponent},
  {path:"**" , component: ShopComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
