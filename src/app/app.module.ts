import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule, MatTabsModule, MatButtonToggleModule, MatButtonModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { CoffeeRecipeComponent } from './coffee-recipe/coffee-recipe.component';
import { RecipeSelectionComponent } from './coffee-recipe/recipe-selection/recipe-selection.component';
import { RecipeExecutionComponent } from './coffee-recipe/recipe-execution/recipe-execution.component';
import { StopwatchComponent } from './coffee-recipe/recipe-execution/stopwatch/stopwatch.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { CoffeeComponent } from './coffee/coffee.component';
import { PreferencesComponent } from './coffee/preferences/preferences.component';
import { ClockComponent } from './coffee/clock/clock.component';
import { ProgressComponent } from './coffee/progress/progress.component';
import { RecipeComponent } from './coffee/recipe/recipe.component';
import { ToolbarComponent } from './coffee/toolbar/toolbar.component';

@NgModule({
  entryComponents: [ClockComponent],
  declarations: [
    AppComponent,
    ClockComponent,
    CoffeeComponent,
    CoffeeRecipeComponent,
    PreferencesComponent,
    ProgressComponent,
    RecipeComponent,
    RecipeExecutionComponent,
    RecipeSelectionComponent,
    StopwatchComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faCheckCircle, faCoffee);
  }
}
