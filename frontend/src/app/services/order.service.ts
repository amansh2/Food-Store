import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { Observable } from 'rxjs';
import { ORDER_CREATE_URL, ORDER_GET, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  create(order: Order): Observable<any> {
    return this.http.post(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }
  pay(order:Order):Observable<any>{
    return this.http.post(ORDER_PAY_URL, order);
  }
  trackOrderById(orderId:string):Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL+orderId);
  }
  getUserOrders():Observable<Order[]>{
    return this.http.get<Order[]>(ORDER_GET);
  }
}
