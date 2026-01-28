jest.unmock('@theme/themeConfig');
import {
  removeTempItem,
  setActiveItemIndex,
  setUIReadyForScroll,
} from '@features/tempMaterial/tempMaterialSlice';
import { style } from '../../../../../Javascript/styles';
const { dim, green, hr, reset } = style;
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { render, screen, fireEvent, act } from '../../../test-utils';
import LoadItem from '../LoadItem';
import { DiscoveryTermObject, TempMaterialState } from '@custom-types/AppTheme';

jest.useFakeTimers();
import nodeConsole from 'console';

describe('LoadItem Logic Flow', () => {
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

      process.stdout.write(TERM_BLURRED);

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

  it('Should sync DTO data with the Redux store on input blur', async () => {
    const { store } = render(<LoadItem />);

    const input = screen.getByTestId('Discovery Term Text Input');
    fireEvent.changeText(input, 'Platypus');
    fireEvent(input, 'blur'); // Trigger sync

    const state = store.getState();
    expect(state.tempMaterial.items[0].dt).toBe('Platypus');
  });

  it('Should remove Item from the form-factory', () => {
    const initialState: TempMaterialState = {
      category: 'Marsupials',
      items: {
        0: { dt: 'Platypus', def: 'Egg-laying marsupial' },
        1: { dt: 'Wombat', def: 'Thick-bodied marsupial' },
        2: { dt: 'Kangaroo', def: 'Strong-legged marsupial' },
      },
      activeItemIndex: null,
      UIReadyForScroll: false,
    };

    const { store } = render(<LoadItem />, {
      preloadedState: {
        tempMaterial: initialState,
      },
    });

    // Simulate Item removal 'onPress' events
    act(() => {
      store.dispatch(removeTempItem(2));
    });

    expect(screen.getByDisplayValue('Platypus')).toBeOnTheScreen();
    expect(screen.queryByDisplayValue('Kangaroo')).toBeNull();
  });
});

describe('LoadItem Layout Registry', () => {
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
  it('Should hydrate the offsets registry via onLayout orchestration', async () => {
    const initialState: TempMaterialState = {
      category: 'Marsupials',
      items: {
        0: { dt: 'Platypus', def: 'Egg-laying marsupial' },
        1: { dt: 'Wombat', def: 'Thick-bodied marsupial' },
        2: { dt: 'Kangaroo', def: 'Strong-legged marsupial' },
      },
      activeItemIndex: null,
      UIReadyForScroll: false,
    };

    const { store } = render(<LoadItem />, {
      preloadedState: {
        tempMaterial: initialState,
      },
    });

    // Target Item containers
    const item0 = screen.getByTestId('Item View 0');
    const item1 = screen.getByTestId('Item View 1');

    // Simulate 'onLayout' events
    act(() => {
      fireEvent(item0, 'layout', {
        nativeEvent: { layout: { y: 100 } },
      });
      fireEvent(item1, 'layout', {
        nativeEvent: { layout: { y: 480 } },
      });
    });

    // ASSERT: Verify the registry has the data.
    // Trigger 'activeItemIndex' (cannot see internal 'ref' easily)
    const scrollView = screen.getByTestId('LoadItem BS ScrollView');

    act(() => {
      store.dispatch(setActiveItemIndex(1));
      store.dispatch(setUIReadyForScroll(true));
    });

    // Lookup '480' and scroll to it
    expect(scrollView.props.ref.current.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ y: 480 }),
    );

    expect(item0).toBeDefined();
  });
});
