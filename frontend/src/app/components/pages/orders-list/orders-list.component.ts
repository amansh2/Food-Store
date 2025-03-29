import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {
  orders=[];
constructor(private router: Router, private orderService: OrderService,private location:Location) {

}
  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe((orders) => {
      this.orders = orders;
    })
  }

  viewOrderDetails(orderId: string) {
    this.router.navigate(['/track', orderId]);
  }
  shopNow(){
    this.location.replaceState('/');
    this.router.navigate(['/']);
  }
}
