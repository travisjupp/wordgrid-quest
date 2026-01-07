jest.unmock('@theme/themeConfig');
import React from 'react';
// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { render, screen, fireEvent } from '../../../test-utils';
import { LoadItem } from '../LoadItem';

describe('LoadItem Logic Flow', () => {
  it('(custom render) should render and provide the theme context automatically', () => {
    render(<LoadItem />);

    // Trigger logic flow logging on layout
    const view = screen.getByTestId('LoadItem View');
    fireEvent(view, 'layout', {
      nativeEvent: { layout: { height: 500 } },
    });
  });
});
