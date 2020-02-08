import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DateTime} from 'luxon';
import {round} from 'lodash';

import { Recipe } from '../../core';
import { MatSnackBar } from '@angular/material';

const FIRST_PHASE_END = 45 * 1000; // 30 seconds % of 3
const SECOND_PHASE_END = (60 + 30) * 1000; // 1:30
const THIRD_PHASE_END = (2 * 60 + 10) * 1000; // 2:10
const FOURTH_PHASE_END = (2 * 60 + 45) * 1000; // 2:45
const FINAL_PHASE_END = (3 * 60 + 30) * 1000; // 3:30

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

  stopwatchCommandEvent: EventEmitter<string> = new EventEmitter();

  totalTime: string;
  formattedSteps: Array<{acc: number, time: string}> = [];
  executedSteps: Array<number> = [];

  progressBar = 0;
  progressBarBuffer = 0;
  progressBarMode = 'buffer';

  isRunning = false;
  currentStep = 0;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const dur = DateTime.fromMillis(this.recipe.totalTime);
    this.totalTime = `${dur.minute}min ${dur.second}sec`;
    this.formattedSteps = this.humanizeSteps(this.recipe);
    this.progressBarBuffer = 0;
    this.progressBar = 0;
    this.currentStep = 0;
  }

  onCounterChange(counter: number) {
    this.updateProgressBar(counter);
    for (const step of this.recipe.steps) {
      const shouldBeRunning = step.startsAt <= counter && step.endsAt > counter;
      if (shouldBeRunning && !this.executedSteps.includes(step.step)) {
        this.executedSteps.push(step.step);
        this.currentStep = step.step;
        this.snackBar.open(`Pour ${step.add}ml (total ${step.acc}ml)`, 'OK', {duration: 10 * 1000});
      }
    }
  }

  onClickStopwatchCmd(cmd: 'start' | 'stop' | 'reset') {
    this.stopwatchCommandEvent.emit(cmd);
    this.isRunning = cmd === 'start';
    if (cmd === 'reset') {
      this.ngOnInit();
    }
    console.log(this.recipe);
  }

  private updateProgressBar(counter: number) {
    this.progressBar = round(this.getProgressPercentage(counter), 2);
    this.progressBarBuffer = this.getBufferTime(counter);
  }

  private getBufferTime(progress: number) {
    if (progress < FIRST_PHASE_END) {
      return this.getProgressPercentage(FIRST_PHASE_END);
    }
    if (progress < SECOND_PHASE_END) {
      return this.getProgressPercentage(SECOND_PHASE_END);
    }
    if (progress < THIRD_PHASE_END) {
      return this.getProgressPercentage(THIRD_PHASE_END);
    }
    if (progress < FOURTH_PHASE_END) {
      return this.getProgressPercentage(FOURTH_PHASE_END);
    }
    return this.getProgressPercentage(FINAL_PHASE_END);
  }

  private getProgressPercentage(counterMs: number) {
    return (counterMs / FINAL_PHASE_END) * 100;
  }

  private humanizeSteps(recipe: Recipe) {
    return recipe.steps.map(step => {
      const moment = DateTime.fromMillis(step.startsAt);
      return {acc: step.acc, time: `${moment.minute + 'm '} ${moment.second}s`};
    });
  }
}
