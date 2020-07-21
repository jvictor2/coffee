import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm3j-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  steps: Array<any> = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
  ];

  constructor() { }

  ngOnInit() {
  }

}
