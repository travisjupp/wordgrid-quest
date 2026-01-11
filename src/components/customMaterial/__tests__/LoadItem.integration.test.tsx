jest.unmock('@theme/themeConfig');
import { style } from '../../../../../Javascript/styles';
const { dim, green, hr, reset } = style;
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { render, screen, fireEvent, act } from '../../../test-utils';
import LoadItem from '../LoadItem';
import { DiscoveryTermObject } from '@custom-types/AppTheme';

jest.useFakeTimers();
import nodeConsole from 'console';

describe('LoadItem Logic Flow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.console = nodeConsole; // Less noise
  });

  afterEach(() => {
    // Clear timers and switch back to real time to prevent leakages
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('Should render and provide the theme context automatically', () => {
    render(<LoadItem />);

    // Trigger logic flow logging on layout
    const view = screen.getByTestId('LoadItem View');
    fireEvent(view, 'layout', {
      nativeEvent: { layout: { height: 500 } },
    });
  });

  it('Should sync multiple item DTOs', async () => {
    const items: DiscoveryTermObject[] = [
      { dt: 'Platypus', def: 'Egg-laying marsupial' },
      { dt: 'Wombat', def: 'Thick-bodied marsupial' },
      { dt: 'Kangaroo', def: 'Strong-legged marsupial' },
    ];

    render(<LoadItem />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    for (const [i, el] of items.entries()) {
      const dtInputs = screen.getAllByTestId('Discovery Term Text Input');
      const defInputs = screen.getAllByTestId('Definition Text Input');
      const numInputsPerItem = 2;

      // Simulate input
      fireEvent.changeText(dtInputs[i], el.dt);
      fireEvent.changeText(defInputs[i], el.def);

      // Trigger sync
      fireEvent(dtInputs[i], 'blur');

      // prettier-ignore
      const TERM_BLURRED = [
        '\n', dim, green, hr.short, 'TERM BLURRED', hr.short, reset,
      ].join('');

      // prettier-ignore
      const ADD_MORE = [
        '\n', dim, green, hr.short, ' › Add More ', hr.short, reset,
      ].join('');

      // process.stdout.write(TERM_BLURRED);

      // Verify items text
      expect(dtInputs[i].props.value).toBe(el.dt);
      expect(defInputs[i].props.value).toBe(el.def);
      expect(dtInputs).toHaveLength(i + 1);
      expect(defInputs).toHaveLength(i + 1);

      // Only press "Add More" if we aren't on the last item
      if (i < items.length - 1) {
        // Add another item
        process.stdout.write(ADD_MORE);
        fireEvent.press(screen.getByTestId('Load Item Add More Button'));

        // Advance Timers: Each new Item added triggers a new focus timeout
        act(() => {
          jest.advanceTimersByTime(500);
        });

        // Verify list grew
        expect(screen.getAllByTestId('Discovery Term Text Input')).toHaveLength(
          i + numInputsPerItem,
        );
      }
    }
  });
});
