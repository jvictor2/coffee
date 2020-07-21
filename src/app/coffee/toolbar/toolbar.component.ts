import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClockCommand } from '../coffee.model';

@Component({
  selector: 'm3j-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output()
  clockCommand: EventEmitter<ClockCommand> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  start() {
    this.clockCommand.emit(ClockCommand.START);
  }

  reset() {
    this.clockCommand.emit(ClockCommand.RESET);
  }

  stop() {
    this.clockCommand.emit(ClockCommand.STOP);
  }

  open(option: 'preferences' | 'help') {

  }
}
