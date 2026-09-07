// import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {jest} from '@jest/globals';
import util from 'node:util';
util.inspect.defaultOptions.depth = null; // show full objects
// util.inspect.defaultOptions.depth = 0; // show truncated objects
// util.inspect.defaultOptions.compact = true; // dont break objects to new lines
// util.inspect.defaultOptions.compact = false; // break objects to new lines

// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { fireEvent, render, screen } from '@utils/test-utils';

import { logItems } from '@utils/logger'; // Log NumericKeyObjectRecord
import nodeConsole from 'console';
jest.unmock('@theme/themeConfig');
import {style} from '@utils/styles';
const { dim, green, hr, reset } = style;

// suppress jests tracing console logs
import console from 'console';
const jestConsole = console;

describe(style.wrap('bolditalic', 'COMPONENT_TITLE\n'), () => {
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

  // it('should add item when updateTempItem is dispatched', () => {
    // const initialState: TempMaterialState = {
    //   category: '',
    //   items: {},
    // };
    // const action = updateTempItem({
    //   id: 0,
    //   data: { dt: 'Whale', def: 'Largest mammals on Earth' },
    // });
    // const nextState = tempMaterialReducer(initialState, action);
    // logItems(0, { 0: 0 }, nextState.items);
    // expect(nextState.category).toBe('');
    // expect(nextState.items[0]).toEqual({
    //   dt: 'Whale',
    //   def: 'Largest mammals on Earth',
    // });
  // });

  // it('Should verify removal of first & last DTOs from the audit list', () => {
  //   const initialState: TempMaterialState = {
  //     category: 'Marsupials',
  //     items: {
  //       0: { dt: 'Platypus', def: 'Egg-laying marsupial' },
  //       1: { dt: 'Wombat', def: 'Thick-bodied marsupial' },
  //       2: { dt: 'Kangaroo', def: 'Strong-legged marsupial' },
  //     },
  //   };
  //
  //   render(<ConfirmMaterialItems />, {
  //     preloadedState: {
  //       tempMaterial: initialState,
  //     },
  //   });
  //
  //   // prettier-ignore
  //   const REMOVAL = [
  //     '\n', dim, green, hr.short, ' REMOVAL EVENT ', hr.short, reset, '\n'
  //   ].join('');
  //   const platypus = screen.getByTestId('List Item Icon Pressable 0');
  //   const kangaroo = screen.getByTestId('List Item Icon Pressable 2');
  //
  //   // Simulate Item removal
  //   process.stdout.write(REMOVAL);
  //   fireEvent.press(platypus);
  //   process.stdout.write(REMOVAL);
  //   fireEvent.press(kangaroo);
  //
  //   // Verify
  //   expect(screen.queryByText('Platypus')).not.toBeOnTheScreen();
  //   expect(screen.queryByText('Wombat')).toBeOnTheScreen();
  //   expect(screen.queryByText('Kangaroo')).not.toBeOnTheScreen();
  // });
});

