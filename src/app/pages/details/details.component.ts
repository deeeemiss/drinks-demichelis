import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class Details implements OnInit {
  data: any;
  drinkIngredients: string[] = [];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['idDrink'];

    this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
      .subscribe((response: any) => {
        this.data = response.drinks[0];
        console.log(this.data);
        this.sumIngredients();
      });
  }

  sumIngredients = () => {
    let drinkKeys = Object.keys(this.data);
    for (const key of drinkKeys) {
      if (key.startsWith('strIngredient')) {
        if (this.data[key] != null) {
          this.drinkIngredients.push(this.data[key]);
        }
      }
    }
  };
}
