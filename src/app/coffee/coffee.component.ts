import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { PreferencesComponent } from './preferences/preferences.component';
import { ClockCommand } from './coffee.model';

@Component({
  selector: 'm3j-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {

  clockCommand: ClockCommand;

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    // this._bottomSheet.open(PreferencesComponent
  }

  openBottomSheet(): void {
    this._bottomSheet.open(PreferencesComponent);
  }

  onClockCommand(command: ClockCommand) {
    console.log(`Command arrived`, command);
  }

}
