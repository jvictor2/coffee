import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../core';
import { Subject } from 'rxjs';

@Component({
  selector: 'm3j-recipe-execution',
  templateUrl: './recipe-execution.component.html',
  styleUrls: ['./recipe-execution.component.scss']
})
export class RecipeExecutionComponent implements OnInit {
  @Input()
  recipe: Recipe;

  currentStep: number;

  // recipe: Recipe;
  constructor() {}

  ngOnInit() {
    this.currentStep = 1;
    console.log('execution', this.recipe);
  }

  onCounterChange(counter: number) {
    for (const step of this.recipe.steps) {
      if (step.startsAt <= counter && step.endsAt > counter) {
        this.currentStep = step.step;
      }
    }
  }
}
