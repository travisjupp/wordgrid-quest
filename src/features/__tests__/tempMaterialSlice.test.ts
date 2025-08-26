import { InitialTempMaterialSliceState } from '@custom-types/AppTheme';
import tempMaterialReducer, {
  setCategory,
  addItem,
  removeItem,
  resetTempMaterial,
} from '@features/tempMaterial/tempMaterialSlice';

describe('tempMaterialSlice', () => {
  it('should set the category when setCategory is dispatched', () => {
    const initialState: InitialTempMaterialSliceState = {
      category: '',
      discoveryTerms: [],
    };
    const action = setCategory('Mammals');
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.category).toBe('Mammals');
    expect(nextState.discoveryTerms).toEqual([]);
  });

  it('should add item when addItem is dispatched', () => {
    const initialState: InitialTempMaterialSliceState = {
      category: '',
      discoveryTerms: [],
    };
    const action = addItem({ dt: 'Whale', def: 'Largest mammals on Earth' });
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.category).toBe('');
    expect(nextState.discoveryTerms).toEqual([
      { dt: 'Whale', def: 'Largest mammals on Earth' },
    ]);
  });

  it('should remove item when removeItem is dispatched', () => {
    const initialState: InitialTempMaterialSliceState = {
      category: 'Mammals',
      discoveryTerms: [{ dt: 'Whale', def: 'Largest mammals on Earth' }],
    };
    const action = removeItem({ dt: 'Whale', def: 'Largest mammals on Earth' });
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.category).toBe('Mammals');
    expect(nextState.discoveryTerms).toEqual([]);
  });

  it('should reset tempMaterial when resetTempMaterial is dispatched', () => {
    const initialState: InitialTempMaterialSliceState = {
      category: 'Mammals',
      discoveryTerms: [{ dt: 'Whale', def: 'Largest mammals on Earth' }],
    };
    const action = resetTempMaterial();
    const nextState = tempMaterialReducer(initialState, action);

    expect(nextState.category).toBe('');
    expect(nextState.discoveryTerms).toEqual([]);
  });
});
