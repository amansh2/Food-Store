import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { CommonService } from '../../../services/common.service';

//window.paypal
declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!:Order;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router:Router,
              private toastrService: ToastrService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              window.location.replace('/track/' + orderId);
              // window.location.href = '/track/' + orderId;
              this.commonService.showToast({
                severity: 'success',
                summary: 'success',
                detail: 'Payment Successfull'
              })
            },
            error: (error) => {
              this.commonService.showToast({
                severity: 'error',
                summary: 'oops!',
                detail: 'Payment Failed'
              })
            }
          }
        );
      },

      onError: (err: any) => {
        this.commonService.showToast({
          severity: 'error',
          summary: 'oops!',
          detail: 'Payment Failed'
        })
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

  }

}
