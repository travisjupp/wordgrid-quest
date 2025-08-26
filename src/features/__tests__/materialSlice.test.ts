import { InitialMaterialSliceState } from '@custom-types/AppTheme';
import materialReducer, {
  addCustomCategory,
  setActiveCategory,
} from '@features/material/materialSlice';

describe('materialSlice', () => {
  it('should set the add custom category when addCustomCategory is dispatched', () => {
    const initialState: InitialMaterialSliceState = {
      category: {
        Marsupials: [
          {
            dt: 'Koala',
            def: 'A tree-dwelling marsupial native to Australia.',
          },
          { dt: 'Wombat', def: 'A burrowing marsupial with a stubby tail.' },
          {
            dt: 'Kangaroo',
            def: 'A large marsupial that hops and carries young in pouch.',
          },
        ],
        // User-Defined Custom-Material here
      },
      activeCategory: 'Marsupials',
    };

    const customCategory = {
      category: 'Mammals',
      discoveryTerms: [
        { dt: 'Whale', def: 'Largest mammal on Earth' },
        { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      ],
    };

    const expectedState = {
      category: {
        Marsupials: [
          {
            dt: 'Koala',
            def: 'A tree-dwelling marsupial native to Australia.',
          },
          { dt: 'Wombat', def: 'A burrowing marsupial with a stubby tail.' },
          {
            dt: 'Kangaroo',
            def: 'A large marsupial that hops and carries young in pouch.',
          },
        ],
        Mammals: [
          { dt: 'Whale', def: 'Largest mammal on Earth' },
          { dt: 'Shrew', def: 'Smallest mammal on Earth' },
          { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
        ],
      },
      activeCategory: 'Marsupials',
    };

    const action = addCustomCategory(customCategory);
    const nextState = materialReducer(initialState, action);
    expect(nextState).toStrictEqual(expectedState);
  });

  it('should set the active category when setActiveCategory is dispatched', () => {
    const initialState: InitialMaterialSliceState = {
      category: {
        Marsupials: [
          {
            dt: 'Koala',
            def: 'A tree-dwelling marsupial native to Australia.',
          },
          { dt: 'Wombat', def: 'A burrowing marsupial with a stubby tail.' },
          {
            dt: 'Kangaroo',
            def: 'A large marsupial that hops and carries young in pouch.',
          },
        ],
        // User-Defined Custom-Material here
      },
      activeCategory: 'Marsupials',
    };

    const action = setActiveCategory('Mammals');
    const nextState = materialReducer(initialState, action);
    expect(nextState.activeCategory).toBe('Mammals');
  });
});
