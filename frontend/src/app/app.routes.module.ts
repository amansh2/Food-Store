import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { OrdersListComponent } from './components/pages/orders-list/orders-list.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
export const routes: Routes = [
    { path: 'search/:searchTerm', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'tag/:tagName', component: HomeComponent },
    {path: 'food/:id', component: FoodPageComponent,},
    {path: 'cart-page', component: CartPageComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'checkout',component:CheckoutPageComponent, canActivate: [authGuard]},
    {path: 'payment', component: PaymentPageComponent, canActivate: [authGuard]},
    {path: 'track/:orderId', component: OrderTrackPageComponent, canActivate: [authGuard]},
    {path: 'orders', component: OrdersListComponent, canActivate: [authGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard]}
]
@NgModule({
    declarations: [], 
    imports: [RouterModule.forRoot(routes)],
    providers: [],
    bootstrap: []
})
export class AppRoutingModule { };
