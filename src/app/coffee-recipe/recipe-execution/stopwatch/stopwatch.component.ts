import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { DateTime, Duration } from 'luxon';

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

  // timer
  isRunning: boolean;
  timerCommand: Subject<string> = new Subject();
  timeLabel: string;
  timerRef;

  @Output()
  counterEvent: EventEmitter<number> = new EventEmitter();

  @Output()
  isRunningEvent: EventEmitter<boolean> = new EventEmitter();

  @Input()
  stopwatchCommand: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.prepareInitialState();
    this.stopwatchCommand.subscribe(cmd => {
      this.handleButtonClick(cmd as any);
    })
  }

  private prepareInitialState() {
    this.counter = 0;
    this.isRunning = false;
    this.timeLabel = '0:00:00';
    clearInterval(this.timerRef);
  }

  private handleButtonClick(cmd: 'start' | 'stop' | 'reset') {
    if (cmd === 'start' && !this.isRunning) {
      this.isRunning = true;
      const startTime = DateTime.local().toMillis() - this.counter;
      this.timerRef = setInterval(() => {
        this.counter = DateTime.local().toMillis() - startTime;
        this.timeLabel = Duration.fromMillis(this.counter).toFormat('h:mm:ss');
        this.counterEvent.emit(this.counter);
      });
      return;
    }

    if (cmd === 'stop' && this.isRunning) {
      this.isRunning = false;
      clearInterval(this.timerRef);
      return;
    }

    if (cmd === 'reset') {
      this.prepareInitialState();
    }
  }

}
