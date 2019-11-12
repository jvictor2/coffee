import { Injectable } from '@angular/core';

export enum RecipeMethod {
  V60_4_6
}

export interface Recipe {
  coffeeGround: number; // gram
  totalBoilingWater: number;
  totalTime: number; // ms
  steps: Array<RecipeStep>;
  totalCups: number;
}

export interface RecipeStep {
  step: number;
  add: number; // boiling water to add
  acc: number; // accumulated boiling water
  startsAt: number; // milliseconds
  endsAt: number; // milliseconds
}

export interface RecipePreferences {
  acidityOrSweetness: 'balanced' | 'sweet' | 'acid';
  strength: 'balanced' | 'higher' | 'lower';
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private static CUP_SIZE = 240;

  calculateSteps(opts: {
    method: RecipeMethod;
    coffeeGround: number;
    preferences?: RecipePreferences;
  }): Recipe {
    // always defaults a preference if user has not selected one
    const prefs = opts.preferences || {
      acidityOrSweetness: 'balanced',
      strength: 'balanced'
    };

    switch (opts.method) {
      case RecipeMethod.V60_4_6:
        return this.calculate_4_6_method(opts.coffeeGround, prefs);
      default:
        return { error: 'unknown method' } as any;
    }
  }

  private calculate_4_6_method(
    coffeeGround: number,
    preferences: RecipePreferences
  ): Recipe {
    const POURS = 5;
    const WATER_FACTOR = 3;
    const totalBoilingWater = coffeeGround * WATER_FACTOR * POURS;
    const totalTime = (3 * 60 + 30) * 1000;

    return {
      coffeeGround,
      totalBoilingWater,
      totalTime,
      steps: this.calculate_4_6_steps_method_steps(
        totalBoilingWater,
        preferences
      ),
      totalCups: Math.round(totalBoilingWater / RecipeService.CUP_SIZE)
    };
  }

  private calculate_4_6_steps_method_steps(
    boilingWater: number,
    prefs: RecipePreferences
  ) {
    const steps: Array<RecipeStep> = [];
    if (prefs.acidityOrSweetness === 'balanced') {
      // 16% (16% total)
      steps.push({
        step: 1,
        add: Math.ceil(boilingWater * 0.16),
        acc: Math.ceil(boilingWater * 0.16),
        startsAt: 0, // 0'0''
        endsAt: 45 * 1000 // 0'45''
      });

      // 24% (40% total)
      steps.push({
        step: 2,
        add: Math.ceil(boilingWater * 0.24),
        acc: Math.ceil(boilingWater * 0.4),
        startsAt: steps.find(s => s.step === 1).endsAt,
        endsAt: (60 + 30) * 1000 // 1'30''
      });
    }

    if (prefs.strength === 'balanced') {
      // 20% (60% total)
      steps.push({
        step: 3,
        add: Math.ceil(boilingWater * 0.2),
        acc: Math.ceil(boilingWater * 0.6),
        startsAt: steps.find(s => s.step === 2).endsAt,
        endsAt: (60 + 60 + 10) * 1000 // 2'10''
      });

      // 20% (80% total)
      steps.push({
        step: 4,
        add: Math.ceil(boilingWater * 0.2),
        acc: Math.ceil(boilingWater * 0.8),
        startsAt: steps.find(s => s.step === 3).endsAt,
        endsAt: (60 + 60 + 45) * 1000 // 2'45''
      });

      // 20% (100% total)
      steps.push({
        step: 5,
        add: Math.ceil(boilingWater * 0.2),
        acc: Math.ceil(boilingWater),
        startsAt: steps.find(s => s.step === 4).endsAt,
        endsAt: (60 + 60 + 60 + 30) * 1000 // 3'30''
      });
    }
    return steps;
  }
}
