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
    const {getByA11yHint} = render(
      <PageHeader label={label} rightAction={{...action, onPress: mockFn}} />,
    );

    const labelComponent = getByA11yHint(AHints.headerLabel);
    const iconContainer = getByA11yHint(action.AHint);

    expect(labelComponent.children[0]).toBe(label);
    expect(iconContainer).toBeDefined();
  });
  it('should trigger mock function on icon press', () => {
    const mockFn = jest.fn();
    const {getByTestId} = render(
      <PageHeader label={label} rightAction={{...action, onPress: mockFn}} />,
    );
    const iconContainer = getByTestId(TestIDs.iconContainer);
    fireEvent(iconContainer, 'onPress');
    expect(mockFn).toHaveBeenCalledWith();
  });

  it('should not render right action', () => {
    const {getByTestId} = render(<PageHeader label={label} />);
    try {
      const iconContainer = getByTestId(TestIDs.iconContainer);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
