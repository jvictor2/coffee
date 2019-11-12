import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService, Recipe, RecipeMethod } from '../../core';

@Component({
  selector: 'm3j-recipe-selection',
  templateUrl: './recipe-selection.component.html',
  styleUrls: ['./recipe-selection.component.scss']
})
export class RecipeSelectionComponent implements OnInit {
  private static INITIAL_COFFEE_GROUND = 4; // 4g produces 60 ml

  @Output()
  recipeEvent: EventEmitter<Recipe> = new EventEmitter();

  coffeeGround: number;
  coffeeCups: number;
  coffeeCupSize: string;
  recipe: Recipe;

  constructor(private readonly recipeService: RecipeService) {}

  ngOnInit() {
    this.coffeeGround = RecipeSelectionComponent.INITIAL_COFFEE_GROUND;
    this.coffeeCups = 1;
    this.coffeeCupSize = 'small cup';

    this.recipe = this.recipeService.calculateSteps({
      method: RecipeMethod.V60_4_6,
      coffeeGround: this.coffeeGround
    });
    this.recipeEvent.emit(this.recipe);
  }

  onChangeCupSlider(val: number) {
    this.coffeeGround = val;
    this.recipe = this.recipeService.calculateSteps({
      method: RecipeMethod.V60_4_6,
      coffeeGround: this.coffeeGround
    });
    const { cups, size } = this.calculateCups(this.recipe.totalBoilingWater);
    this.coffeeCups = cups;
    this.coffeeCupSize = size;
    this.recipeEvent.emit(this.recipe);
  }

  onRecipeChange() {}

  private calculateCups(ml: number): { cups: number; size: string } {
    if (ml <= 60) {
      return { cups: 1, size: 'small' };
    }
    return { cups: Math.round(ml / 240), size: 'cups' };
  }
}
