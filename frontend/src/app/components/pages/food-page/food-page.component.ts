import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { CartService } from 'src/app/services/cart.service';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(private activatedRoute:ActivatedRoute,private foodService:FoodService,private cartService: CartService, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id){
        foodService.getFoodById(params.id).subscribe((data)=>{
          this.food = data;
        })
      }
    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
