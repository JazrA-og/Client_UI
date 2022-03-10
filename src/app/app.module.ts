import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { Proxy } from './core/services/proxy.service';
import { CommonService } from './core/services/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CredentialsService } from './core/services/credentials.service';
import { CartComponent } from './components/cart/cart.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ClientHistoryComponent } from './components/client-history/client-history.component';
import { BusinessComponent } from './components/business/business.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { LocalStorageService } from './core/services/local-storage.service';
import { BookingComponent } from './components/booking/booking.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { HistoryDetailsComponent } from './components/history-details/history-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ShopComponent,
    FooterComponent,
    BannerComponent,
    MenuComponent,
    MapComponent,
    CartComponent,
    InvoiceComponent,
    ClientHistoryComponent,
    BusinessComponent,
    BusinessDetailsComponent,
    ClientInfoComponent,
    DeleteConfirmationComponent,
    ProductItemComponent,
    BookingComponent,
    BusinessCardComponent,
    HistoryDetailsComponent,
    CommentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot()

  ],
  entryComponents: [DeleteConfirmationComponent],
  providers: [Proxy, CommonService, CredentialsService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
