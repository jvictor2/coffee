import { Component, OnInit, EventEmitter } from '@angular/core';
import { Recipe } from '../core';

@Component({
  selector: 'm3j-coffee-recipe',
  templateUrl: './coffee-recipe.component.html',
  styleUrls: ['./coffee-recipe.component.scss']
})
export class CoffeeRecipeComponent implements OnInit {
  constructor() {}

  recipe: Recipe;

  ngOnInit() {}

  onRecipeChange(recipe: Recipe) {
    console.log('new recipe received');
    this.recipe = recipe;
  }
}
