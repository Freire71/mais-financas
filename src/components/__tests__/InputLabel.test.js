import 'react-native';
import React from 'react';
import {render} from '../../utils/Tests';

import InputLabel, {AHints, TestIDs} from '../InputLabel';

describe('<InputLabel />', () => {
  const label = 'Nome completo';
  const tip = 'Uma dica';

  it('should render properly', () => {
    const {getByTestId, getByA11yHint, getAllByHintText} = render(
      <InputLabel label={label} required={true} tip={tip} />,
    );

    const labelComponent = getByA11yHint(AHints.label);
    const icon = getAllByHintText(AHints.tipIcon); // Tooltip component  duplicate its icon child
    const tipText = getByTestId(TestIDs.tipText);

    expect(labelComponent.children[0]).toBe(`${label} *`);
    expect(icon.length).toBeGreaterThan(0);
    expect(tipText.children[0]).toBe(tip);
  });
  it('should render without tip icon', () => {
    const {getByTestId, getByA11yHint, getAllByHintText} = render(
      <InputLabel label={label} required={true} />,
    );
    const labelComponent = getByA11yHint(AHints.label);
    expect(labelComponent.children[0]).toBe(`${label} *`);
    try {
      getAllByHintText(AHints.tipIcon);
    } catch (err) {
      expect(err).toBeDefined();
    }
    try {
      const tipText = getByTestId(TestIDs.tipText);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should render with required label', () => {
    const {getByTestId, getByA11yHint, getAllByHintText} = render(
      <InputLabel label={label} tip={tip} />,
    );
    const labelComponent = getByA11yHint(AHints.label);
    const icon = getAllByHintText(AHints.tipIcon); // Tooltip component  duplicate its icon child
    const tipText = getByTestId(TestIDs.tipText);

    expect(labelComponent.children[0]).toBe(label);
    expect(icon.length).toBeGreaterThan(0);
    expect(tipText.children[0]).toBe(tip);
  });
});
