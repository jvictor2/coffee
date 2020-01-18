import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {round} from 'lodash';
import { Subject } from 'rxjs';

const FIRST_PHASE_END = 45 * 1000; // 30 seconds % of 3
const SECOND_PHASE_END = (60 + 30) * 1000; // 1:30
const THIRD_PHASE_END = (2 * 60 + 10) * 1000; // 2:10
const FOURTH_PHASE_END = (2 * 60 + 45) * 1000; // 2:45
const FINAL_PHASE_END = (3 * 60 + 30) * 1000; // 3:30

interface RecipeStep {
  quantity: number;
  phaseMs: number;
  currentStatus: (counter: number) => 'done' | 'processing' | 'scheduled';
}

@Component({
  selector: 'm3j-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
  counter = 0;
  progressBar = 0;
  progressBarBuffer = 0;
  progressBarMode = 'buffer';

  timerCommand: Subject<string> = new Subject();

  @Output()
  counterEvent: EventEmitter<number> = new EventEmitter();

  @Output()
  isRunningEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCounterChange(count: number) {
    this.counter = count;
    this.counterEvent.emit(this.counter);
    this.progressBar = round(this.getProgressPercentage(this.counter), 2);
    this.progressBarBuffer = this.getBufferTime(this.counter);

    if (this.counter >= FINAL_PHASE_END) {
      return this.onButtonClick('stop');
    }
  }

  onButtonClick(cmd: 'start' | 'stop' | 'reset') {
    this.timerCommand.next(cmd);
    this.isRunningEvent.emit(['start', 'stop'].includes(cmd) ? true : false);
    if (cmd === 'reset') {
      this.progressBar = 0;
      this.progressBarBuffer = 0;
      this.counter = 0;
    }
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
}
