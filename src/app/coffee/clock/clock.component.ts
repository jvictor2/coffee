import { Component, Input } from '@angular/core';
import { IStopwatch } from '../coffee.model';
import { Duration } from 'luxon';

@Component({
  selector: 'm3j-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent {
  // https://progressbarjs.readthedocs.io/en/latest/
  timerLabel = '0:00:00';

  @Input()
  set stopwatch(stopwatch: IStopwatch) {
    this.timerLabel = Duration.fromMillis(stopwatch.currentTime).toFormat(`h:mm:ss`);
  }
}
