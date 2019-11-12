import { RecipeService, Recipe, RecipeMethod } from './recipe.service';

describe('core.recipeService', () => {
  let service: RecipeService;
  beforeEach(() => {
    service = new RecipeService();
  });

  it('gets 20mg recipe with default preferences', () => {
    const expected: Recipe = {
      coffeeGround: 20,
      totalTime: (60 + 60 + 60 + 30) * 1000,
      totalBoilingWater: 300,
      steps: [
        {
          step: 1,
          add: 48,
          acc: 48,
          startsAt: 0,
          endsAt: 45 * 1000
        },
        {
          step: 2,
          add: 72,
          acc: 120,
          startsAt: 45 * 1000,
          endsAt: 90 * 1000
        },
        {
          step: 3,
          add: 60,
          acc: 180,
          startsAt: 90 * 1000,
          endsAt: (2 * 60 + 10) * 1000
        },
        {
          step: 4,
          add: 60,
          acc: 240,
          startsAt: (2 * 60 + 10) * 1000,
          endsAt: (2 * 60 + 45) * 1000
        },
        {
          step: 5,
          add: 60,
          acc: 300,
          startsAt: (2 * 60 + 45) * 1000,
          endsAt: (3 * 60 + 30) * 1000
        }
      ]
    };

    const actual = service.calculateSteps({
      method: RecipeMethod.V60_4_6,
      coffeeGround: 20
    });
    expect(actual).toEqual(expected);
  });
});
