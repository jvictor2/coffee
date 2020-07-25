import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule, MatTabsModule, MatButtonToggleModule, MatButtonModule } from '@angular/material';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatListModule } from '@angular/material/list';
// import { MatStepperModule } from '@angular/material/stepper';
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
  entryComponents: [PreferencesComponent],
  declarations: [
    AppComponent,
    CoffeeRecipeComponent,
    RecipeExecutionComponent,
    RecipeSelectionComponent,
    StopwatchComponent,
    CoffeeComponent,
    PreferencesComponent,
    ClockComponent,
    ProgressComponent,
    RecipeComponent,
    ToolbarComponent,
  ],
  imports: [
    NgbModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    // MatButtonModule,
    // MatCardModule,
    // MatChipsModule,
    // MatDividerModule,
    // MatFormFieldModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatButtonToggleModule,
    // MatToolbarModule,
    // MatListModule,
    // MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faCheckCircle, faCoffee);
  }
}
