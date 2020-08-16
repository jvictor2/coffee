import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Duration } from 'luxon';
import { MatBottomSheetRef } from '@angular/material';
import { ClockService } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'm3j-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();

  private timerLabel = '0:00';

  set clock(val: string) {
    this.timerLabel = val;
  }

  get clock() {
    return this.timerLabel;
  }

  constructor(
    private readonly ref: ChangeDetectorRef,
    private readonly clockBottomSheet: MatBottomSheetRef<ClockComponent>,
    private readonly clockService: ClockService,
  ) { }

  ngOnInit() {
    this.subscription.add(this.stopwatchSubscription());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openLink(event: MouseEvent) {
    this.clockBottomSheet.dismiss();
    event.preventDefault();
  }

  private stopwatchSubscription() {
    return this.clockService.stopwatch$.subscribe(sw => {
      this.timerLabel = Duration.fromMillis(sw.currentTime).toFormat(`m:ss`);
      this.ref.detectChanges();
    });
  }
}
