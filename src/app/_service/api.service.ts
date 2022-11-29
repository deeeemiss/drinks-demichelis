import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // search
  // lookup
  // list
  // filter
  constructor(private httpClient: HttpClient) {}

  searchCocktailByFirstLetter(firstLetter: string) {
    return this.httpClient.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
    );
  }

  searchCocktailByName(name: string) {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name
    );
  }

  randomCocktail() {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
  }

  searchIngredientByName(name: string) {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + name
    );
  }

  searchCoctailByIngredient(name: string) {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + name
    );
  }
}
