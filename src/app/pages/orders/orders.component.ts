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
};

@Component({
  selector: 'app-home',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  drinksData: any;
  searchDrink = '';
  searchDrinkIngredient = '';
  searchData = { drink: '' };
  toggle: boolean = true;
  idSelected: string[] = [];
  selections: boolean = false;
  drinkCart: any[] = [];

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

  handleSubmit() {
    this.httpClient
      .get(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' +
          this.searchDrink
      )
      .subscribe((response: any) => {
        this.drinksData = response.drinks;
        this.drinksData.forEach((drink: any) => this.checkSelection(drink));
      });
  }

  checkSelection(drink: any) {
    for (const element of this.idSelected) {
      if (element === drink.idDrink) {
        drink.checked = true;
      }
    }
  }

  handleClear() {
    this.drinksData.forEach((drink: any) => (drink.checked = false));
    this.idSelected = [];
    this.drinkCart = [];
  }

  select(drink: any) {
    drink.checked = false;
    for (let i = 0; i < this.idSelected.length; i++) {
      if (this.idSelected[i] === drink.idDrink) {
        this.idSelected.splice(i, 1);
      }
    }
    console.log(this.idSelected);
    for (let i = 0; i < this.drinkCart.length; i++) {
      if (this.drinkCart[i].idDrink === drink.idDrink) {
        this.drinkCart.splice(i, 1);
      }
    }
  }

  deselect(drink: any) {
    if (this.idSelected.length < 5) {
      drink.checked = true;
      this.idSelected.push(drink.idDrink);
      console.log(this.idSelected);
      this.drinkCart.push(drink);
    } else {
      alert('Puoi selezionare solo 5 drink');
    }
  }

  handleSelect(drink: any) {
    if (drink.checked) {
      this.select(drink);
    } else {
      this.deselect(drink);
      this.toggle = !this.toggle;
    }
  }
}
