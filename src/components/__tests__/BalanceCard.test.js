import 'react-native';
import React from 'react';
import {render} from '../../utils/Tests';

import BalanceCard, {AHints} from '../BalanceCard';
import DisplayMonetaryValue from '../../utils/DisplayMonetaryValue';

describe('<BalancedCard />', () => {
  const data = {
    balance: 25000,
    todayIncome: 1000,
    todayOutcome: 500,
  };
  it('should render properly', () => {
    const {getByA11yHint} = render(
      <BalanceCard
        balance={data.balance}
        todayIncome={data.todayIncome}
        todayOutcome={data.todayOutcome}
      />,
    );
    const balanceCard = getByA11yHint(AHints.balanceCard);
    const todayIncomeCard = getByA11yHint(AHints.todayIncomeCard);
    const todayOutcomeCard = getByA11yHint(AHints.todayOutcomeCard);

    expect(balanceCard.children[0]).toBe(DisplayMonetaryValue(data.balance));
    expect(todayIncomeCard.children[0]).toBe(
      DisplayMonetaryValue(data.todayIncome),
    );
    expect(todayOutcomeCard.children[0]).toBe(
      DisplayMonetaryValue(data.todayOutcome),
    );
  });
});
