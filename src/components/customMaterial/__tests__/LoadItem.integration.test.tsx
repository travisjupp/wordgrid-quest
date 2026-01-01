import React from 'react';
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { render as customRender, screen, fireEvent } from '../../../test-utils';
import { render } from '@testing-library/react-native';
import { LoadItem } from '../LoadItem';
import { useAppTheme } from '@theme/themeConfig';

describe('LoadItem Logic Flow', () => {
  it('(custom render) should render and provide the theme context automatically', () => {
    customRender(<LoadItem />);

    // Trigger logic flow loggin on layout
    const view = screen.getByTestId('LoadItem View');
    fireEvent(view, 'layout', {
      nativeEvent: { layout: { height: 500 } },
    });
  });

  const ThemeSpy = () => {
    const theme = useAppTheme();
    console.log('CURRENT_TEST_THEME', theme);
    return null;
  };

  it('logs the actual theme object being used', () => {
    render(
      <>
        <ThemeSpy />
        <LoadItem />
      </>,
    );
  });

  it.skip('(default render) should throw error test suite failed to run', () => {
    render(<LoadItem />);

    // Trigger logic flow loggin on layout
    const view = screen.getByTestId('LoadItem View');
    fireEvent(view, 'layout', {
      nativeEvent: { layout: { height: 500 } },
    });
  });
});
