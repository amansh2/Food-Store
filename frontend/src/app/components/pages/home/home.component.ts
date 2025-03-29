import { FoodService } from '../../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods: any;
  foodObservable: Observable<any>;
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) this.foodObservable = this.foodService.getSearchedFoods(params.searchTerm);
      else  this.foodObservable = this.foodService.getAll();

      if(params['tagName']){
        if(params['tagName'] == 'All') this.foodObservable = this.foodService.getAll();
        else this.foodObservable = this.foodService.getFoodsByTag (params.tagName);
      }
      this.foodObservable.subscribe((data) => {
        this.foods = data;
      });
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
