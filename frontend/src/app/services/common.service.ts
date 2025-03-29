import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private toastSubject = new BehaviorSubject<any>(null);
  constructor() { }

  showToast(data){
    this.toastSubject.next(data);
  }

//   hideLoading(){
//     this.isLoadingSubject.next(false);
//   }

  get toastObservable(){
    return this.toastSubject.asObservable();
  }
}
