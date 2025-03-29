import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private messageService: MessageService, private commonService: CommonService) {
  }
  title = 'frontend';
  subscription: any;
  ngOnInit() {
    this.subscription=this.commonService.toastObservable.subscribe((toast) => {
      if(toast){
        this.messageService.add({
          severity: toast.severity,
          summary: toast.summary,
          detail: toast.detail
        })
      }
    })
  }
  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
