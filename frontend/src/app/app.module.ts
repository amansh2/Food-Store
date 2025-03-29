import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FoodService } from './services/food.service';
import {HomeComponent} from './components/pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from "primeng/rating"; 
import { AppRoutingModule } from './app.routes.module';
import { SearchComponent } from './components/partials/search/search.component';
import { RouterModule } from '@angular/router';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingService } from './services/loading.service';
import { UserService } from './services/user.service';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { LocationService } from './services/location.service';
import { ToastModule } from 'primeng/toast';
import { CommonService } from './services/common.service';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrdersListComponent } from './components/pages/orders-list/orders-list.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    NotFoundComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    LoginPageComponent,
    TitleComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    OrderTrackPageComponent,
    PaypalButtonComponent,
    OrdersListComponent,
    ProfileComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    RatingModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
        timeOut:3000,
        positionClass:'toast-bottom-right',
        newestOnTop:false
    }),
    ToastModule,
    PanelModule,
    TableModule,
    CardModule
],

  bootstrap: [AppComponent],
  providers:[
    FoodService,
    CartService,
    LoadingService,
    UserService,
    OrderService,
    LocationService,
    CommonService,
    MessageService,
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true }
]
})
export class AppModule { }