import { Component, OnInit } from '@angular/core';
import { ClockCommand, IStopwatch } from './coffee.model';
import { ClockService } from '../core';
import { ClockComponent } from './clock/clock.component';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'm3j-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();

  stopwatch: IStopwatch;
  clockCommand: ClockCommand;

  constructor(
    private clockBottomSheet: MatBottomSheet,
    private readonly clockService: ClockService,
  ) { }

  ngOnInit() {
    this.subscription.add(this.stopwatchSubscription());
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    this.clockService.start();
    this.clockBottomSheet.open(ClockComponent);
  }

  onClockCommand(command: ClockCommand) {
    console.log(`Command arrived`, command);

    switch (command) {
      case ClockCommand.START: return this.clockService.start();
      case ClockCommand.STOP: return this.clockService.stop();
      case ClockCommand.RESET:
      default:
        return this.clockService.reset();
    }
  }

  private stopwatchSubscription() {
    return this.clockService
      .stopwatch$
      .subscribe(stopwatch => {
        this.stopwatch = stopwatch;
        console.log(`Running?` + stopwatch.isRunning);
      });
  }

}
