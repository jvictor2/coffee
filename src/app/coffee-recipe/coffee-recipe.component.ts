import { Component, OnInit } from '@angular/core';
import { Recipe } from '../core';

@Component({
  selector: 'm3j-coffee-recipe',
  templateUrl: './coffee-recipe.component.html',
  styleUrls: ['./coffee-recipe.component.scss']
})
export class CoffeeRecipeComponent implements OnInit {
  constructor() {}

  recipe: Recipe;
  isStopwatchRunning = false;

  ngOnInit() {}

  onRecipeChange(recipe: Recipe) {
    console.log('new recipe received');
    this.recipe = recipe;
  }

  onExecutionStatusChange(isRunning: boolean) {
    console.log('recipe', isRunning);
    this.isStopwatchRunning = isRunning;
  }
}
