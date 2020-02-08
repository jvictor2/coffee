import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import {round} from 'lodash';

import { RecipeService, Recipe, RecipeMethod } from '../../core';

const COFFEE_GROUND_X_WATER_FACTOR = 15;
const CUP_SIZE = 180; //

@Component({
  selector: 'm3j-recipe-selection',
  templateUrl: './recipe-selection.component.html',
  styleUrls: ['./recipe-selection.component.scss']
})
export class RecipeSelectionComponent implements OnInit {
  @Input()
  isStopwatchRunning = false;

  @Output()
  recipeEvent: EventEmitter<Recipe> = new EventEmitter();

  cupSize: number = CUP_SIZE;

  coffeeGround: number;
  coffeeCups: number;
  boilingWater: number;
  recipe: Recipe;
  acidityAndSweetness: 'balanced' | 'sweet' | 'acid' = 'balanced';
  strengh: 'balanced' | 'higher' | 'lower' = 'balanced';

  constructor(private readonly recipeService: RecipeService) {}

  ngOnInit() {
    const {coffeeGround, boilingWater, cups} = this.recipeUpdate();
    this.coffeeGround = coffeeGround;
    this.coffeeCups = cups;
    this.boilingWater = boilingWater;

    this.recipe = this.recipeService.calculateSteps({
      method: RecipeMethod.V60_4_6,
      coffeeGround: this.coffeeGround
    });
    this.recipeEvent.emit(this.recipe);
  }

  onChangeCoffeeGround(val: any) {
    this.onRecipeChange(round(val.target.value), undefined, undefined);
  }

  onChangeBoilingWater(val: any) {
    this.onRecipeChange(undefined, round(val.target.value), undefined);
  }

  onChangeCups(val: any) {
    this.onRecipeChange(undefined, undefined, round(val.target.value, 1));
  }

  // tslint:disable-next-line: variable-name
  private onRecipeChange(_coffeeGround?: number, _boilingWater?: number, _cups?: number) {
    const {coffeeGround, boilingWater, cups} = this.recipeUpdate(_coffeeGround, _boilingWater, _cups);
    this.coffeeCups = cups;
    this.coffeeGround = coffeeGround;
    this.boilingWater = boilingWater;

    this.recipe = this.recipeService.calculateSteps({
      method: RecipeMethod.V60_4_6,
      coffeeGround: this.coffeeGround
    });
    this.recipeEvent.emit(this.recipe);
  }

  private recipeUpdate(
    coffeeGround?: number,
    boilingWater?: number,
    cups?: number,
  ): { cups: number; coffeeGround: number; boilingWater: number } {
    if (coffeeGround != null) {
      return {
        coffeeGround,
        boilingWater: round(coffeeGround * COFFEE_GROUND_X_WATER_FACTOR),
        cups: round((coffeeGround * COFFEE_GROUND_X_WATER_FACTOR) / CUP_SIZE, 1),
      };
    }
    if (boilingWater != null) {
      return {
        coffeeGround: round(boilingWater / COFFEE_GROUND_X_WATER_FACTOR),
        boilingWater,
        cups: round(boilingWater / CUP_SIZE, 1),
      };
    }
    if (cups != null) {
      return {
        coffeeGround: round((cups * CUP_SIZE) / COFFEE_GROUND_X_WATER_FACTOR),
        boilingWater: round(cups * CUP_SIZE),
        cups,
      };
    }
    return this.recipeUpdate(8); // defaults to 8g
  }

}
