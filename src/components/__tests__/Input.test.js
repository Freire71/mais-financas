import 'react-native';
import React from 'react';
import {render, fireEvent} from '../../utils/Tests';

import Input, {AHints, TestIDs} from '../Input';

describe('<Input />', () => {
  const mask = 'R$ [999].[99]';
  const placeholder = 'placeholder';
  const keyboardType = 'numeric';
  const initialValue = '0';

  it('should render component properly', () => {
    const mockFn = jest.fn();
    const {getByTestId} = render(
      <Input
        label="Teste"
        mask={mask}
        placeholder={placeholder}
        value={initialValue}
        keyboardType={keyboardType}
        handleValue={mockFn}
      />,
    );
    const inputMaskContainer = getByTestId(TestIDs.inputMaskContainer);
    const props = inputMaskContainer.children[0]._fiber.memoizedProps;

    expect(props.mask).toBe(mask);
    expect(props.placeholder).toBe(placeholder);
    expect(props.keyboardType).toBe(keyboardType);
    expect(props.value).toBe(initialValue);
  });

  it('should trigger mock function when input value changes', () => {
    const mockFn = jest.fn();
    const {getByTestId} = render(
      <Input
        label="Teste"
        mask={mask}
        placeholder={placeholder}
        value={initialValue}
        keyboardType={keyboardType}
        handleValue={mockFn}
      />,
    );
    const inputMaskContainer = getByTestId(TestIDs.inputMaskContainer);
    const input = inputMaskContainer.children[0];

    fireEvent(input, 'onChangeText', 'lorem ipsum');
    expect(mockFn).toHaveBeenCalledWith('lorem ipsum');
  });
});
