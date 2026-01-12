jest.unmock('@theme/themeConfig');
import { style } from '../../../../../Javascript/styles';
const { dim, green, hr, reset } = style;
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { render, screen, fireEvent, act } from '../../../test-utils';
import { DiscoveryTermObject } from '@custom-types/AppTheme';
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
    const items: DiscoveryTermObject[] = [
      { dt: 'Platypus', def: 'Egg-laying marsupial' },
      { dt: 'Wombat', def: 'Thick-bodied marsupial' },
      { dt: 'Kangaroo', def: 'Strong-legged marsupial' },
    ];

    render(<ConfirmMaterialItems />, {
      preloadedState: {
        tempMaterial: {
          category: 'Marsupials',
          discoveryTerms: items,
        },
      },
    });
    expect(await screen.findByText('Platypus')).toBeTruthy();
  });
});
