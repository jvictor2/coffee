import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

import { Recipe } from '../core';

@Component({
  selector: 'm3j-coffee-recipe',
  templateUrl: './coffee-recipe.component.html',
  styleUrls: ['./coffee-recipe.component.scss']
})
export class CoffeeRecipeComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  recipe: Recipe;
  isStopwatchRunning = false;

  private queryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.queryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.queryListener);
  }

  onRecipeChange(recipe: Recipe) {
    this.recipe = recipe;
  }

  onExecutionStatusChange(isRunning: boolean) {
    this.isStopwatchRunning = isRunning;
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.queryListener);
  }

}
