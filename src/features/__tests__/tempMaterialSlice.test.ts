import { TempMaterialState } from '@custom-types/AppTheme';
import tempMaterialReducer, {
  setTempCategory,
  updateTempItem,
  removeTempItem,
  resetTempMaterial,
} from '@features/tempMaterial/tempMaterialSlice';
import { style } from '../../../../Javascript/styles';
import { logItems } from '@utils/logger';
import nodeConsole from 'console';
jest.unmock('@theme/themeConfig');
const { dim, green, hr, reset } = style;

describe(style.wrap('bolditalic', 'tempMaterialSlice\n'), () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.console = nodeConsole; // Less noise
    // prettier-ignore
    const TEST_BEFORE = [
      '\n',
      style.color(255, 0, 255),
      '▷ ',
      style.reset,
      style.color(39),
      expect.getState().currentTestName,
      style.reset,
      '\n',
    ].join('');

    process.stdout.write(TEST_BEFORE);
  });

  afterEach(() => {
    // Clear timers and switch back to real time to prevent leakages
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    const TEST_AFTER = [
      '\n',
      style.color(99),
      style.hr.double,
      style.reset,
      '\n',
    ].join('');

    process.stdout.write(TEST_AFTER);
  });

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
    logItems(0, { 0: 0 }, nextState.items);
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
    // prettier-ignore
    const REMOVAL = [
      '\n', dim, green, hr.short, ' REMOVAL EVENT ', hr.short, reset, '\n'
    ].join('');

    logItems(0, { 0: 0 }, initialState.items);
    logItems(1, { 0: 0 }, initialState.items);
    process.stdout.write(REMOVAL);
    const action = removeTempItem(0);
    const nextState = tempMaterialReducer(initialState, action);
    logItems(1, { 0: 0 }, nextState.items);

    expect(nextState.items[1].dt).toBe('Platypus');
  });

  it('should reset tempMaterial when resetTempMaterial is dispatched', () => {
    const initialState: TempMaterialState = {
      category: 'Mammals',
      items: {
        0: { dt: 'Whale', def: 'Largest mammals on Earth' },
      },
    };
    logItems(0, { 0: 0 }, initialState.items);
    const action = resetTempMaterial();
    const nextState = tempMaterialReducer(initialState, action);
    logItems(0, { 0: 0 }, nextState.items);

    expect(nextState.category).toBe('');
    expect(nextState.items).toEqual({});
  });
});
