jest.unmock('@theme/themeConfig');
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { render, screen } from '../../../test-utils';
import { TempMaterialState } from '@custom-types/AppTheme';
import ConfirmMaterialItems from '@components/customMaterial/ConfirmMaterialItems';

jest.useFakeTimers();
import nodeConsole from 'console';

describe('ConfirmMaterialItems Logic Flow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.console = nodeConsole; // Less noise
  });

  afterEach(() => {
    // Clear timers and switch back to real time to prevent leakages
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
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
    expect(await screen.findByText('Platypus')).toBeTruthy();
  });
});
