import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Response = {
  drinks: {
    idDrink: number;
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string;
    strInstructionsIT: string;
  }[];
  ingredients: {
    idIngredient: number;
    strIngredient: string;
    strDescription: string;
  }[];
};

@Component({
  selector: 'app-home',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  drinksData: any;
  searchDrink = '';
  searchDrinkIngredient = '';
  searchData = { drink: '', ingredient: '' };

  letterIndex: number = 0;
  letters: string[] = 'abcdefghijklmnopqrstvwyz'.split('');

  constructor(private httpClient: HttpClient) {}

  drinksByLetter = (httpClient: HttpClient) => {
    this.httpClient
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=`)
      .subscribe((response: any) => {
        this.drinksData = response.drinks;
      });
  };

  ngOnInit(): void {
    this.drinksByLetter(this.httpClient);
  }

  handleSubmitIngredient() {
    this.httpClient
      .get(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' +
          this.searchDrinkIngredient
      )
      .subscribe((response: any) => {
        this.drinksData = response.drinks;
      });

    console.log(this.drinksData);
  }

  handleSubmit() {
    this.httpClient
      .get(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' +
          this.searchDrink
      )
      .subscribe((response: any) => {
        this.drinksData = response.drinks;
      });
  }
}
