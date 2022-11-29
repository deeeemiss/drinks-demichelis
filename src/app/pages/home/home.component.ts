import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  drinks: any[] = [];
  featureCocktail: any;
  firstLetter = '';
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.changeFirstLetter('A');
    this.getRandomDrink();
  }

  changeFirstLetter(letter: string) {
    this.firstLetter = letter;
    this.apiService
      .searchCocktailByFirstLetter(this.firstLetter)
      .subscribe((response: any) => {
        this.drinks = response.drinks;
      });
  }

  getRandomDrink() {
    this.apiService.randomCocktail().subscribe((response: any) => {
      this.featureCocktail = response.drinks[0];
    });
  }
}
