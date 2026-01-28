jest.unmock('@theme/themeConfig');
import { style } from '../../../../../Javascript/styles';
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { fireEvent, render, screen } from '../../../test-utils';
import { TempMaterialState } from '@custom-types/AppTheme';
import ConfirmMaterialItems from '@components/customMaterial/ConfirmMaterialItems';

jest.useFakeTimers();
import nodeConsole from 'console';

describe('ConfirmMaterialItems Logic Flow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.console = nodeConsole; // Less noise
    console.log(
      style.color(255, 0, 255),
      '▷',
      style.reset,
      style.color(39),
      expect.getState().currentTestName,
      style.reset,
      '\n',
    );
  });

  afterEach(() => {
    // Clear timers and switch back to real time to prevent leakages
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    console.log(style.color(99), style.hr.double, style.reset);
  });

  it('Should render mock items from preloaded state', async () => {
    const initialState: TempMaterialState = {
      category: 'Marsupials',
      items: {
        0: { dt: 'Platypus', def: 'Egg-laying marsupial' },
        1: { dt: 'Wombat', def: 'Thick-bodied marsupial' },
        2: { dt: 'Kangaroo', def: 'Strong-legged marsupial' },
      },
    };

    render(<ConfirmMaterialItems />, {
      preloadedState: {
        tempMaterial: initialState,
      },
    });

    expect(await screen.findByText(initialState.items[0].dt)).toBeTruthy();
    expect(await screen.findByText(initialState.items[0].def)).toBeTruthy();
    expect(await screen.findByText(initialState.items[1].dt)).toBeTruthy();
    expect(await screen.findByText(initialState.items[1].def)).toBeTruthy();
    expect(await screen.findByText(initialState.items[2].dt)).toBeTruthy();
    expect(await screen.findByText(initialState.items[2].def)).toBeTruthy();
  });

  it('Should verify removal of a DTO from the audit list', () => {
    const initialState: TempMaterialState = {
      category: 'Marsupials',
      items: {
        0: { dt: 'Platypus', def: 'Egg-laying marsupial' },
        1: { dt: 'Wombat', def: 'Thick-bodied marsupial' },
        2: { dt: 'Kangaroo', def: 'Strong-legged marsupial' },
      },
    };

    render(<ConfirmMaterialItems />, {
      preloadedState: {
        tempMaterial: initialState,
      },
    });

    const platypus = screen.getByTestId('List Item Icon Pressable 0');
    const kangaroo = screen.getByTestId('List Item Icon Pressable 2');

    // Simulate Item removal
    fireEvent.press(platypus);
    fireEvent.press(kangaroo);

    // Verify
    expect(screen.queryByText('Platypus')).not.toBeOnTheScreen();
    expect(screen.queryByText('Wombat')).toBeOnTheScreen();
    expect(screen.queryByText('Kangaroo')).not.toBeOnTheScreen();
  });
});
