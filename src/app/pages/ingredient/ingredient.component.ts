import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
})
export class IngredientComponent implements OnInit {
  drinks: any[] = [];
  ingredient: string = '';
  ingredientImg: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.ingredient = this.route.snapshot.paramMap.get('ingredient')!;
    this.apiService
      .searchCoctailByIngredient(this.ingredient)
      .subscribe((data: any) => {
        this.drinks = data.drinks;
        this.ingredientImg = `https://www.thecocktaildb.com/images/ingredients/${this.ingredient}.png`;
      });
  }
}
