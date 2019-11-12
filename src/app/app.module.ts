import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { TimerComponent } from './stopwatch/timer/timer.component';
import { CoffeeRecipeComponent } from './coffee-recipe/coffee-recipe.component';
import { RecipeSelectionComponent } from './coffee-recipe/recipe-selection/recipe-selection.component';
import { RecipeExecutionComponent } from './coffee-recipe/recipe-execution/recipe-execution.component';

@NgModule({
  declarations: [
    AppComponent,
    StopwatchComponent,
    TimerComponent,
    CoffeeRecipeComponent,
    RecipeSelectionComponent,
    RecipeExecutionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSliderModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
