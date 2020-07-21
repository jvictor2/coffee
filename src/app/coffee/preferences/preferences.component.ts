import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { IPreferences } from './preferences.model';

@Component({
  selector: 'm3j-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<PreferencesComponent>) { }

  preferences: IPreferences;

  ngOnInit() {
    this.preferences = {
      cups: 2,
      boilingWater: 100,
      coffeeGround: 15,
    };
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onChangeCups(value: number) {
    this.preferences.cups = value;
    this.preferences.boilingWater = value * 15;
  }

}
