import 'react-native';
import React from 'react';
import {render} from '../../utils/Tests';

import {
  ITransactionTypeEnum,
  ITransactionCategoryEnum,
} from '../../models/Transaction';
import TransactionItem, {AHints, ALabels} from '../TransactionItem';
import DisplayMonetaryValue from '../../utils/DisplayMonetaryValue';

describe('<TransactionItem />', () => {
  const incomeTransaction = {
    id: new Date().toString(),
    title: 'Title 1',
    type: ITransactionTypeEnum.INCOME,
    amount: 100,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const outcomeFoodTransaction = {
    id: new Date().toString(),
    title: 'Title 2',
    type: ITransactionTypeEnum.OUTCOME,
    category: ITransactionCategoryEnum.FOOD,
    amount: 50,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const outcomeGeneralTransaction = {
    id: new Date().toString(),
    title: 'Title 3',
    type: ITransactionTypeEnum.OUTCOME,
    category: ITransactionCategoryEnum.GENERAL,
    amount: 25,
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('should render properly an income transaction', () => {
    const {getByA11yHint} = render(<TransactionItem {...incomeTransaction} />);
    const title = getByA11yHint(AHints.title);
    const amount = getByA11yHint(AHints.amount);
    const type = getByA11yHint(AHints.type);

    expect(title.children[0]).toBe(incomeTransaction.title);
    expect(amount.children[0]).toBe(
      DisplayMonetaryValue(incomeTransaction.amount),
    );
    expect(type._fiber.stateNode.props.accessibilityLabel).toBe(
      ALabels.incomeTransaction,
    );
    try {
      getByA11yHint(AHints.category);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should render properly an outcome transaction of food category', () => {
    const {getByA11yHint} = render(
      <TransactionItem {...outcomeFoodTransaction} />,
    );
    const title = getByA11yHint(AHints.title);
    const amount = getByA11yHint(AHints.amount);
    const type = getByA11yHint(AHints.type);
    const category = getByA11yHint(AHints.category);

    expect(title.children[0]).toBe(outcomeFoodTransaction.title);
    expect(amount.children[0]).toBe(
      DisplayMonetaryValue(outcomeFoodTransaction.amount),
    );
    expect(type._fiber.stateNode.props.accessibilityLabel).toBe(
      ALabels.outcomeTransaction,
    );
    expect(category.children[0]).toBe(ITransactionCategoryEnum.FOOD);
  });

  it('should render properly an outcome transaction of general category', () => {
    const {getByA11yHint} = render(
      <TransactionItem {...outcomeGeneralTransaction} />,
    );
    const title = getByA11yHint(AHints.title);
    const amount = getByA11yHint(AHints.amount);
    const type = getByA11yHint(AHints.type);
    const category = getByA11yHint(AHints.category);

    expect(title.children[0]).toBe(outcomeGeneralTransaction.title);
    expect(amount.children[0]).toBe(
      DisplayMonetaryValue(outcomeGeneralTransaction.amount),
    );
    expect(type._fiber.stateNode.props.accessibilityLabel).toBe(
      ALabels.outcomeTransaction,
    );
    expect(category.children[0]).toBe(ITransactionCategoryEnum.GENERAL);
  });
});
