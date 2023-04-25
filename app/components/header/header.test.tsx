import * as React from 'react';

import { fireEvent, render } from '~/test/utils';

import { Header } from './header';

describe('Header', function () {
  it('calls the correct function upon left icon press', function () {
    const handleLeftIconPress = jest.fn();
    const { getByTestId } = render(
      <Header title='Test Title' onPressLeftIcon={handleLeftIconPress} />
    );
    fireEvent.press(getByTestId('left-icon'));
    expect(handleLeftIconPress).toHaveBeenCalled();
  });

  it('calls the correct function upon right icon press', function () {
    const handleRightIconPress = jest.fn();
    const { getByTestId } = render(
      <Header title='Test Title' onPressRightIcon={handleRightIconPress} />
    );

    fireEvent.press(getByTestId('right-icon'));
    expect(handleRightIconPress).toHaveBeenCalled();
  });
});
