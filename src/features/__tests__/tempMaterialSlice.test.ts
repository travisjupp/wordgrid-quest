import { TempMaterialState } from '@custom-types/AppTheme';
import tempMaterialReducer, {
  setTempCategory,
  updateTempItem,
  removeTempItem,
  resetTempMaterial,
} from '@features/tempMaterial/tempMaterialSlice';

describe('tempMaterialSlice', () => {
  it('should set the category when setTempCategory is dispatched', () => {
    const initialState: TempMaterialState = {
      category: '',
      items: {},
    };
    const action = setTempCategory('Mammals');
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.category).toBe('Mammals');
    expect(nextState.items).toEqual({});
  });

  it('should add item when updateTempItem is dispatched', () => {
    const initialState: TempMaterialState = {
      category: '',
      items: {},
    };
    const action = updateTempItem({
      id: 0,
      data: { dt: 'Whale', def: 'Largest mammals on Earth' },
    });
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.category).toBe('');
    expect(nextState.items[0]).toEqual({
      dt: 'Whale',
      def: 'Largest mammals on Earth',
    });
  });

  it('should remove item when removeTempItem is dispatched', () => {
    const initialState: TempMaterialState = {
      category: 'Mammals',
      items: {
        0: { dt: 'Whale', def: 'Largest mammals on Earth' },
        1: { dt: 'Platypus', def: 'Egg-layer' },
      },
    };
    const action = removeTempItem(0);
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.items[1].dt).toBe('Platypus');
  });

  it('should reset tempMaterial when resetTempMaterial is dispatched', () => {
    const initialState: TempMaterialState = {
      category: 'Mammals',
      items: {
        0: { dt: 'Whale', def: 'Largest mammals on Earth' },
      },
    };
    const action = resetTempMaterial();
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.category).toBe('');
    expect(nextState.items).toEqual({});
  });
});
