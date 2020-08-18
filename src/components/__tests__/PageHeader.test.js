import 'react-native';
import React from 'react';
import {render, fireEvent} from '../../utils/Tests';

import PageHeader, {TestIDs, AHints} from '../PageHeader';

describe('<PageHeader />', () => {
  const label = 'Label';
  const action = {
    iconName: 'trash-outline',
    AHint: 'Hint',
    ALabel: 'Label',
  };

  it('should render properly', () => {
    const mockFn = jest.fn();
    const {getByA11yHint, getAllByA11yHint, getByText} = render(
      <PageHeader
        label={label}
        rightAction={{...action, onPress: mockFn}}
        leftAction={{...action, onPress: mockFn}}
      />,
    );

    const iconContainers = getAllByA11yHint(action.AHint);

    expect(getByText(label)).toBeDefined();
    expect(iconContainers.length).toBe(2);
  });
  it('should trigger mock function on icon press', () => {
    const rightMockFn = jest.fn();
    const leftMockFn = jest.fn();
    const {getAllByTestId} = render(
      <PageHeader
        label={label}
        rightAction={{...action, onPress: rightMockFn}}
        leftAction={{...action, onPress: leftMockFn}}
      />,
    );
    const iconContainer = getAllByTestId(TestIDs.iconContainer);

    fireEvent(iconContainer[0], 'onPress');
    fireEvent(iconContainer[1], 'onPress');

    expect(rightMockFn).toHaveBeenCalledWith();
    expect(leftMockFn).toHaveBeenCalledWith();
  });

  it('should not render any action', () => {
    const {getByTestId} = render(<PageHeader label={label} />);
    try {
      getByTestId(TestIDs.iconContainer);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
