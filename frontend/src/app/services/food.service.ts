import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return  this.http.get(FOODS_URL);
  }
  getSearchedFoods(search: string) :Observable<any>{
    return this.http.get(FOODS_BY_SEARCH_URL+search)
  }
  getAllTags(): Observable<any>{
    return this.http.get(FOODS_TAGS_URL);
  }
  getFoodsByTag(tagName:string): Observable<any>{
    return this.http.get(FOODS_BY_TAG_URL+tagName);
  }
  getFoodById(id):Observable<any>{
    return this.http.get(FOOD_BY_ID_URL+id);
  }
}
