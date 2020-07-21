import { Injectable } from '@angular/core';

import { isEqual } from 'lodash';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { IStopwatch } from '../coffee/coffee.model';

@Injectable({ providedIn: 'root' })
export class ClockService {
  private counter = 0;
  private isRunning: boolean;
  private timerRef;

  private readonly stopwatch: BehaviorSubject<IStopwatch> = new BehaviorSubject({currentTime: 0, isRunning: false});
  readonly stopwatch$ = this.stopwatch.asObservable().pipe(distinctUntilChanged(isEqual));

  start() {
    const startTime = DateTime.local().toMillis() - this.counter;
    this.timerRef = setInterval(() => {
      this.counter = DateTime.local().toMillis() - startTime;
      this.isRunning = true;

      this.stopwatch.next({
        currentTime: this.counter,
        isRunning: this.isRunning,
      });
    });
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.timerRef);
    this.stopwatch.next({
      currentTime: this.counter,
      isRunning: this.isRunning,
    });
  }

  reset() {
    this.counter = 0;
    this.isRunning = false;
    clearInterval(this.timerRef);
    this.stopwatch.next({currentTime: 0, isRunning: false});
  }
}
