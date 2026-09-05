import { style } from '@utils/styles';
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { fireEvent, render, screen } from '@utils/test-utils';
import { TempMaterialState } from '@custom-types/AppTheme';
import ConfirmMaterialItems from '@components/customMaterial/ConfirmMaterialItems';
import nodeConsole from 'console';
jest.unmock('@theme/themeConfig');
const { dim, green, hr, reset } = style;

jest.useFakeTimers();

describe(style.wrap('bolditalic', 'ConfirmMaterialItems Logic Flow\n'), () => {
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

  it('Should verify removal of first & last DTOs from the audit list', () => {
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

    // prettier-ignore
    const REMOVAL = [
      '\n', dim, green, hr.short, ' REMOVAL EVENT ', hr.short, reset, '\n'
    ].join('');
    const platypus = screen.getByTestId('List Item Icon Pressable 0');
    const kangaroo = screen.getByTestId('List Item Icon Pressable 2');

    // Simulate Item removal
    process.stdout.write(REMOVAL);
    fireEvent.press(platypus);
    process.stdout.write(REMOVAL);
    fireEvent.press(kangaroo);

    // Verify
    expect(screen.queryByText('Platypus')).not.toBeOnTheScreen();
    expect(screen.queryByText('Wombat')).toBeOnTheScreen();
    expect(screen.queryByText('Kangaroo')).not.toBeOnTheScreen();
  });
});
