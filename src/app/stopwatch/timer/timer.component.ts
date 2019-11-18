import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { DateTime, Duration } from 'luxon';
import { Subject } from 'rxjs';

@Component({
  selector: 'm3j-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Output()
  counterChange: EventEmitter<number> = new EventEmitter();

  @Input()
  startStopCommand: Subject<string> = new Subject();

  counter: number;
  isRunning: boolean;
  timerRef;
  timeLabel: string;

  constructor() {}

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  ngOnInit() {
    this.prepareInitialState();
    this.startStopCommand.subscribe(cmd => {
      if (['start', 'stop', 'reset'].includes(cmd)) {
        this.updateTimer(cmd as any);
      }
    });
  }

  private prepareInitialState() {
    this.counter = 0;
    this.isRunning = false;
    this.timeLabel = '0:00:00';
    clearInterval(this.timerRef);
  }

  private updateTimer(cmd: 'start' | 'stop' | 'reset') {
    if (cmd === 'start' && !this.isRunning) {
      this.isRunning = true;
      const startTime = DateTime.local().toMillis() - this.counter;
      this.timerRef = setInterval(() => {
        this.counter = DateTime.local().toMillis() - startTime;
        this.counterChange.emit(this.counter);
        this.timeLabel = Duration.fromMillis(this.counter).toFormat('h:mm:ss');
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
      this.counterChange.emit(this.counter);
    }
  }
}
