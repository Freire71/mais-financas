import 'react-native';
import React from 'react';
import {render, fireEvent} from '../../utils/Tests';

import TransactionListInput, {ALabels} from '../TransactionListInput';

describe('<TrasanctionListInput />', () => {
  const data = ['Option 1', 'Option 2', 'Option 3'];
  const label = 'Label';
  const value = '';
  it('should render component properly', () => {
    const mockFn = jest.fn();
    const {getAllByA11yLabel} = render(
      <TransactionListInput
        data={data}
        label={label}
        onPress={mockFn}
        value={value}
      />,
    );
    const options = getAllByA11yLabel(ALabels.item);
    expect(options.length).toBe(3);
  });

  it('should present correct behavior on item press', () => {
    const mockFn = jest.fn();
    const {getAllByA11yLabel} = render(
      <TransactionListInput
        data={data}
        label={label}
        onPress={mockFn}
        value={value}
      />,
    );
    const options = getAllByA11yLabel(ALabels.item);
    fireEvent.press(options[0]);
    expect(mockFn).toBeCalledWith(data[0]);
  });
  it('should not trigger on press when disabled ', () => {
    const mockFn = jest.fn();
    const {getAllByA11yLabel} = render(
      <TransactionListInput
        data={data}
        label={label}
        onPress={mockFn}
        value={value}
        isDisabled
      />,
    );
    const options = getAllByA11yLabel(ALabels.item);
    fireEvent.press(options[0]);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
