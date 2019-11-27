import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DateTime} from 'luxon';

import { Recipe } from '../../core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'm3j-recipe-execution',
  templateUrl: './recipe-execution.component.html',
  styleUrls: ['./recipe-execution.component.scss']
})
export class RecipeExecutionComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  _recipe: Recipe;
  @Input() set recipe(r: Recipe) {
    this._recipe = r;
    this.formattedSteps = this.humanizeSteps(r);
  }
  get recipe() {
    return this._recipe;
  }


  @Output()
  isRunningEvent: EventEmitter<boolean> = new EventEmitter();

  currentStep: number;
  totalTime: string;
  formattedSteps: Array<{acc: number, time: string}> = [];
  executedSteps: Array<number> = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const dur = DateTime.fromMillis(this.recipe.totalTime);
    this.totalTime = `${dur.minute} minutes ${dur.second} seconds`;
    this.formattedSteps = this.humanizeSteps(this.recipe);
    this.currentStep = 1;
  }

  onCounterChange(counter: number) {
    for (const step of this.recipe.steps) {
      const shouldBeRunning = step.startsAt <= counter && step.endsAt > counter;
      if (shouldBeRunning && !this.executedSteps.includes(step.step)) {
        this.executedSteps.push(step.step);
        this.currentStep = step.step;
        this.snackBar.open(`Pour ${step.add}ml (total ${step.acc}ml)`, 'OK', {duration: 10 * 1000});
      }
    }
  }

  onIsRunningChange(clockRunning: boolean) {
    this.isRunningEvent.emit(clockRunning);
  }

  private humanizeSteps(recipe: Recipe) {
    return recipe.steps.map(step => {
      const moment = DateTime.fromMillis(step.startsAt);
      return {acc: step.acc, time: `${moment.minute + 'm '} ${moment.second}s`};
    });
  }
}
