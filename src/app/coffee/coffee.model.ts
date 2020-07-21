
export interface IPreferences {
  acidity: number;
  sweetness: number;
}

export interface IRecipe {
  steps: Array<IRecipeStep>;
}

export interface IRecipeStep {
  startsAt: number;
  endsAt: number;
}

export interface IStopwatch {
  currentTime: number;
  isRunning: boolean;
  // currentStep?: IRecipeStep;
}

export enum ClockCommand {
  START = 'START',
  STOP = 'STOP',
  RESET = 'RESET',
}
