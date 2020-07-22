import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm3j-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  steps: Array<any> = [
    {id: 1, text: '0ml -> + 10ml -> 10ml'},
    {id: 2, text: '10ml -> + 100ml -> 110ml'},
    {id: 3, text: 'Something here'},
    {id: 4, text: 'Something here'},
    {id: 5, text: 'Something here'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
