import { Component, OnInit } from '@angular/core';

enum Acidity {
  ACID = 'acid',
  BALANCED = 'balanced',
  SWEET = 'sweet',
}

enum Intensity {
  LIGHT = 'light',
  BALANCED = 'balanced',
  INTENSE = 'intense',
}

@Component({
  selector: 'm3j-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  acidity: Acidity = Acidity.BALANCED;
  intensity: Intensity = Intensity.BALANCED;

  constructor() { }

  ngOnInit() {
  }

}
